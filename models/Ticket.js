"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    
    static associate(models) {
      this.belongsTo(models.Reserva, {
        foreignKey: "reservaid",
        as: "reserva",
      });
    }
  }
  Ticket.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      reservaid: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Reserva, key: "id" },
      },
      qrcode: DataTypes.BLOB,
    },
    { sequelize, modelName: "Ticket", tableName: "tickets", timestamps: false }
  );
  return Ticket;
};
