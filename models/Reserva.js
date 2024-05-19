"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
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
      this.belongsTo(models.Veiculo, {
        foreignKey: "VeiculoID",
        as: "veiculo",
      });
      this.belongsTo(models.Vaga, { foreignKey: "VagaID", as: "vaga" });
    }
  }
  Reserva.init(
    {
      ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      UsuarioID: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Usuario, key: "ID" },
      },
      VeiculoID: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Veiculo, key: "ID" },
      },
      VagaID: {
        type: DataTypes.INTEGER,
        references: { model: sequelize.models.Vaga, key: "ID" },
      },
      HorarioEntrada: DataTypes.TIME,
      HorarioSaida: DataTypes.TIME,
      DataReserva: DataTypes.DATE,
    },
    { sequelize, modelName: "Reserva", tableName: "reservas" }
  );
  return Reserva;
};
