

const CompanyService = require('../services/company');
const saveCompanyDetails = async (request, response) => {
  try {
    const url = request.body.urlLink;
    const companies = await CompanyService.saveCompanyDetails(url);
    return response.status(201).json({ status: 201, data: companies, message: 'Saved Companies Data' });
  } catch (error) {
    return response.status(500).json({ status: 500, message: error.message });
  }
};
const getTopRankedCompanies = async (request, response) => {
  try {
    const companies = await CompanyService.getTopRankedCompanies(request.params.sectorName);
    return response.status(200).json({ status: 200, data: companies, message: 'Retreived Top Ranked Companies' });
  } catch (error) {
    return response.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = { saveCompanyDetails, getTopRankedCompanies };