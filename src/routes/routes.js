const Router = require('express');
const router = Router();
const CompanyController = require('../controllers/company');
const { urlValidation } = require('../middleware/validation');



router.route('/api/save')
  .post(urlValidation, CompanyController.saveCompanyDetails);
router.route('/api/companies')
  .get(CompanyController.getTopRankedCompanies);
router.route('/api/companies/:id')
  .patch(CompanyController.changeNameOfCompany);
module.exports = { router };
