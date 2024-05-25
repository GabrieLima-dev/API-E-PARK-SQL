"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Veiculo extends Model {
    
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "usuarioid",
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
      usuarioid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      marca: {
        type: DataTypes.STRING,
        
      },
      modelo: {
        type: DataTypes.STRING,
        
      },
      ano: {
        type: DataTypes.INTEGER,
        
      },
      placa: {
        type: DataTypes.STRING,
        
      },
    },
    { sequelize, modelName: "Veiculo", tableName: "veiculos", timestamps: false }
  );
  return Veiculo;
};
