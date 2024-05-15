"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Veiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "UsuarioID",
        as: "usuario",
      });
    }
  }
  Veiculo.init(
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true },
      UsuarioID: {
        type: DataTypes.INTEGER,
        references: { model: Usuario, key: "ID" },
      },
      Marca: DataTypes.STRING,
      Modelo: DataTypes.STRING,
      Ano: DataTypes.INTEGER,
      Placa: DataTypes.STRING,
    },
    { sequelize, modelName: "veiculo" }
  );
  return Veiculo;
};
