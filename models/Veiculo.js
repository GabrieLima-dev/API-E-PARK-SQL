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
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      UsuarioID: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Usuario, key: "id" },
      },
      Marca: DataTypes.STRING,
      Modelo: DataTypes.STRING,
      Ano: DataTypes.INTEGER,
      Placa: DataTypes.STRING,
    },
    { sequelize, modelName: "Veiculo", tableName: "veiculos", timestamps: false }
  );
  return Veiculo;
};
