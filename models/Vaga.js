"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vaga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vaga.init(
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true },
      Tipo: DataTypes.STRING,
      Ocupada: DataTypes.BOOLEAN,
    },
    { sequelize, modelName: "vaga", tableName: "vagas" }
  );
  return Vaga;
};
