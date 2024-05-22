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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UsuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      Marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Modelo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Placa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Veiculo", tableName: "veiculos", timestamps: false }
  );
  return Veiculo;
};
