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
        foreignKey: "Reservaid",
        as: "reserva",
      });
    }
  }
  Ticket.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      Reservaid: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Reserva, key: "id" },
      },
      QRCode: DataTypes.BLOB,
    },
    { sequelize, modelName: "ticket", tableName: "tickets", timestamps: false }
  );
  return Ticket;
};
