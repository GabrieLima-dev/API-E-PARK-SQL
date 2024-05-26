"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "usuarioid",
        as: "usuario",
      });
      this.belongsTo(models.Veiculo, {
        foreignKey: "veiculoid",
        as: "veiculo",
      });
      this.belongsTo(models.Vaga, { foreignKey: "vagaid", as: "vaga" });
    }
  }
  Reserva.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      usuarioid: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Usuario, key: "id" },
      },
      veiculoid: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Veiculo, key: "id" },
      },
      vagaid: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Vaga, key: "id" },
      },
      horarioentrada: DataTypes.TIME,
      horariosaida: DataTypes.TIME,
      datareserva: DataTypes.DATE,
    },
    { sequelize, modelName: "Reserva", tableName: "reservas", timestamps: false }
  );
  return Reserva;
};
