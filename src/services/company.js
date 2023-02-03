/* eslint-disable no-unused-vars */

const needle = require('needle');
const Sequelize = require('sequelize');
const csvParser = require('csv-parser');
const { default: axios } = require('axios');
const db = require('../../database/models/index');
const scoreUtil = require('../utils/scoreCalculator');
const saveCompanyDetails = async (url) => {
  const data = await needle
    .get(url)
    .pipe(csvParser())
    .on('data', async (data) => {
      let companyDetailsResponse = await axios.get(`http://54.167.46.10/company/${data.company_id}`);
      let companyPerformanceResponse = await axios.get(`http://54.167.46.10/sector?name=${data.company_sector}`);
      let companyPerformanceData = companyPerformanceResponse.data.find(element => element.companyId === data.company_id);
      let cpi = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'cpi').value);
      let cf = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'cf').value);
      let mau = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'mau').value);
      let roic = Number(companyPerformanceData.performanceIndex.find(element => element.key === 'roic').value);
      let score = scoreUtil.calculateScore(cpi, cf, mau, roic);
      let company = await db.Company.create({ name: companyDetailsResponse.data.name, tags: companyDetailsResponse.data.tags, ceo: companyDetailsResponse.data.ceo, score: Number(score), numberOfEmployees: 0, sectorName: data.company_sector });
    })
    .on('end', (err) => {
      if (err)
        console.log(err);
    });
  const companies = await db.Company.findAll({ attributes: ['id', 'name', 'score'] });
  return companies;
};
const getTopRankedCompanies = async (sectorName) => {
  let companies = await db.Company.findAll({ where: { sectorName: sectorName }, attributes: ['id', 'name', 'ceo', 'score', [Sequelize.literal('(RANK() OVER (ORDER BY score DESC))'), 'ranking']] });
  return companies;
};
const changeNameOfCompany = async (id, name) => {
  await db.Company.update({ name: name }, { where: { id: id } });
  let company = await db.Company.findOne({ where: { id: id } });
  return company;
};
module.exports = { saveCompanyDetails, getTopRankedCompanies, changeNameOfCompany };