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
      ID: { type: DataTypes.INTEGER, primaryKey: true },
      UsuarioID: {
        type: DataTypes.INTEGER,
        references: { model: Usuario, key: "ID" },
      },
      VeiculoID: {
        type: DataTypes.INTEGER,
        references: { model: Veiculo, key: "ID" },
      },
      VagaID: {
        type: DataTypes.INTEGER,
        references: { model: Vaga, key: "ID" },
      },
      HorarioEntrada: DataTypes.TIME,
      HorarioSaida: DataTypes.TIME,
      DataReserva: DataTypes.DATE,
    },
    { sequelize, modelName: "reserva", tableName: "reservas" }
  );
  return Reserva;
};
