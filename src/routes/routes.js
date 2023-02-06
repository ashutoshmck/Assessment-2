const Router = require('express');
const router = Router();
const CompanyController = require('../controllers/company');
const { urlValidation, sectorNameValidation, changeNameBodyValidation, changeNameIdValidation } = require('../middleware/validation');



router.route('/api/save')
  .post(urlValidation, CompanyController.saveCompanyDetails);

router.route('/api/companies')
  .get(sectorNameValidation, CompanyController.getTopRankedCompanies);

router.route('/api/companies/:id')
  .patch(changeNameBodyValidation, changeNameIdValidation, CompanyController.changeNameOfCompany);

module.exports = { router };
