
const Joi = require('joi');

const urlSchema = Joi.object({ urlLink: Joi.string().required() });
const sectorNameSchema = Joi.object({ urlLink: Joi.string().required() });
const urlValidation = (req, res, next) => {
  const { error } = urlSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
const sectorNameValidation = (req, res, next) => {
  const { error } = sectorNameSchema.validate(req.query.sector);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
module.exports = { urlValidation, sectorNameValidation };