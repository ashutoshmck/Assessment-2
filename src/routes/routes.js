const Router = require('express');
const router = Router();
const Joi = require('joi');
const CompanyController = require('../controllers/company');

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
const urlSchema = Joi.object({ urlLink: Joi.string().required() });


router.route('/api/save')
  .post(validationMiddleware(urlSchema), CompanyController.saveCompanyDetails);
router.route('api/companies')
  .get(CompanyController.getTopRankedCompanies);
module.exports = { router };
