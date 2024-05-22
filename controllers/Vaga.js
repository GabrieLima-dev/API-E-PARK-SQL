const express = require("express");
const router = express.Router();
const { sequelize, Vaga } = require('../models');

// const Listar = async (req, res) => {
//   const lista = await db.usuario.findAll();
//   return res.json(lista);
// };

router.get("/", async (req, res) => {
  const vaga = await Vaga.findAll();
  res.json(vaga);
});

router.get("/:id", async (req, res) => {
  const vaga = await Vaga.findByPk(req.params.id);
  res.json(vaga);
});

router.post("/", async (req, res) => {
  const vaga = await Vaga.create(req.body);
  res.json(vaga);
});

router.put("/:id", async (req, res) => {
  await Vaga.update(req.body, { where: { ID: req.params.id } });
  res.json({ success: "Vaga updated" });
});

router.delete("/:id", async (req, res) => {
  await Vaga.destroy({ where: { ID: req.params.id } });
  res.json({ success: "Vaga deleted" });
});

module.exports = (app) => app.use("/Vaga", router);
