
const Joi = require('joi');
const urlSchema = Joi.object({ urlLink: Joi.string().required() });
const sectorNameSchema = Joi.object({ sector: Joi.string().required() });
const companyIdSchema = Joi.object({ companyId: Joi.string().required() });
const companyNameSchema = Joi.object({ name: Joi.string().required() });

const urlValidation = (req, res, next) => {
  const { error } = urlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const sectorNameValidation = (req, res, next) => {
  const { error } = sectorNameSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const changeNameBodyValidation = (req, res, next) => {
  const { error } = companyNameSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const changeNameIdValidation = (req, res, next) => {
  const { error } = companyIdSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
module.exports = { urlValidation, sectorNameValidation, changeNameBodyValidation, changeNameIdValidation };