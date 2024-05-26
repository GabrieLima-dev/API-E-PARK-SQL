"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vaga extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Vaga.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      tipo: DataTypes.STRING,
      ocupada: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: "Vaga", tableName: "vagas", timestamps: false }
  );
  return Vaga;
};
