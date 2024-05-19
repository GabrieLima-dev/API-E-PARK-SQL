const express = require("express");
const router = express.Router();
const { Reserva } = require('../models');

// Get all reserva
router.get("/", async (req, res) => {
  const reserva = await Reserva.findAll();
  res.json(reserva);
});

// Get reserva by ID
router.get("/:id", async (req, res) => {
  const reserva = await Reserva.findByPk(req.params.id);
  res.json(reserva);
});

// Create new reserva
router.post("/", async (req, res) => {
  const reserva = await Reserva.create(req.body);
  res.json(reserva);
});

// Update reserva
router.put("/:id", async (req, res) => {
  await Reserva.update(req.body, { where: { ID: req.params.id } });
  res.json({ success: "Reserva updated" });
});

// Delete reserva
router.delete("/:id", async (req, res) => {
  await Reserva.destroy({ where: { ID: req.params.id } });
  res.json({ success: "Reserva deleted" });
});

module.exports = (app) => app.use("/Reserva", router);
