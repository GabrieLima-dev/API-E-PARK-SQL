const express = require("express");
const router = express.Router();
const { Usuario } = require('../models');

router.get("/", async (req, res) => {
  const usuario = await Usuario.findAll();
  res.json(usuario);
});

router.get("/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  res.json(usuario);
});

router.post("/", async (req, res) => {
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
});

router.put("/:id", async (req, res) => {
  await Usuario.update(req.body, { where: { ID: req.params.id } });
  res.json({ success: "Usuario updated" });
});

router.delete("/:id", async (req, res) => {
  await Usuario.destroy({ where: { ID: req.params.id } });
  res.json({ success: "Usuario deleted" });
});

module.exports = (app) => app.use("/Usuario", router);