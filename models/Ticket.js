"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Reserva, {
        foreignKey: "ReservaID",
        as: "reserva",
      });
    }
  }
  Ticket.init(
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true },
      ReservaID: {
        type: DataTypes.INTEGER,
        references: { model: Reserva, key: "ID" },
      },
      QRCode: DataTypes.BLOB,
    },
    { sequelize, modelName: "ticket", tableName: "tickets" }
  );
  return Ticket;
};
