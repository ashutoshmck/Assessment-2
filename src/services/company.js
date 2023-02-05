/* eslint-disable no-unused-vars */

const needle = require('needle');
const Sequelize = require('sequelize');
const csvParser = require('csv-parser');
const { default: axios } = require('axios');
const db = require('../../database/models/index');
const scoreUtil = require('../utils/scoreCalculator');
const { pipeline } = require('stream/promises');
const saveCompanyDetails = async (url) => {
  const data = await (await axios.get(url)).data;
  const companyData = data.split('\n');
  for (let i = 1; i < companyData.length; i++) {
    const element = companyData[i];
    const companyId = element.split(',')[0];
    const companySector = element.split(',')[1];
    let companyDetailsResponse = await axios.get(`http://54.167.46.10/company/${companyId}`);
    let companyPerformanceResponse = await axios.get(`http://54.167.46.10/sector?name=${companySector}`);
    let companyPerformanceData = companyPerformanceResponse.data.find(element => element.companyId === companyId);
    let cpi = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'cpi').value);
    let cf = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'cf').value);
    let mau = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'mau').value);
    let roic = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'roic').value);
    let score = scoreUtil.calculateScore(cpi, cf, mau, roic);
    let company = await db.Company.create({ companyId: String(companyId), name: companyDetailsResponse.data.name, tags: companyDetailsResponse.data.tags, ceo: companyDetailsResponse.data.ceo, score: Number(score), numberOfEmployees: 0, sectorName: companySector });
  }
  const companies = await db.Company.findAll({ attributes: [['companyId', 'id'], 'name', 'score'] });
  return companies;
};
const getTopRankedCompanies = async (sectorName) => {
  let companies = await db.Company.findAll({ where: { sectorName: sectorName }, attributes: [['companyId', 'id'], 'name', 'ceo', 'score', [Sequelize.literal('(RANK() OVER (ORDER BY score DESC))'), 'ranking']] });
  return companies;
};
const changeNameOfCompany = async (id, name) => {
  await db.Company.update({ name: name }, { where: { companyId: id } });
  let company = await db.Company.findOne({ where: { companyId: id } });
  return company;
};
module.exports = { saveCompanyDetails, getTopRankedCompanies, changeNameOfCompany };