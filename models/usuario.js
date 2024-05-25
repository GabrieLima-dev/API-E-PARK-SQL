"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Usuario.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      foto: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuarios",
      timestamps: false, // Isso impede que o Sequelize adicione automaticamente as colunas createdAt e updatedAt
    }
  );
  return Usuario;
};
