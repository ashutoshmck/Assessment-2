/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    numberOfEmployees: DataTypes.INTEGER,
    score: DataTypes.FLOAT,
    ceo: DataTypes.STRING,
    sectorName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};