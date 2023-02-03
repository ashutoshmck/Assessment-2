
const needle = require('needle');
const Sequelize = require('sequelize');
const csvParser = require('csv-parser');
const { default: axios } = require('axios');
const db = require('../../database/models/index');
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
      let score = Number(Number((Number(cpi * 10) + Number(cf / 10000) + Number(mau * 10) + Number(roic)) / 4).toFixed(2));
      let company = await db.Company.create({ name: companyDetailsResponse.data.name, tags: companyDetailsResponse.data.tags, ceo: companyDetailsResponse.data.ceo, score: Number(score), numberOfEmployees: 0, sectorName: data.company_sector });
    })
    .on('end', (err) => {
      if (err)
        console.log(err);
    });
  return db.Company.findAll({ attributes: ['id', 'name', 'score'] });
};
const getTopRankedCompanies = async (sectorName) => {
  let companies = await db.Company.findAll({ where: { sectorName: sectorName }, attributes: ['id', 'name', 'ceo', 'score', [Sequelize.literal('(RANK() OVER (ORDER BY score DESC))'), 'ranking']] });
  return companies;
};
module.exports = { saveCompanyDetails, getTopRankedCompanies };