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
      ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      Tipo: DataTypes.STRING,
      Ocupada: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: "Vaga", tableName: "vagas", timestamps: false }
  );
  return Vaga;
};
