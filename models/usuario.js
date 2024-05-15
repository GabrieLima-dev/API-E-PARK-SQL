"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init(
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true },
      Nome: DataTypes.STRING,
      Email: DataTypes.STRING,
      Senha: DataTypes.STRING,
      Foto: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "usuario", tableName: "usuarios" 
    }
  );
  return Usuario;
};
