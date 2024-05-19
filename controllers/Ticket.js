const express = require("express");
const router = express.Router();
const { Ticket } = require('../models');

// Get all ticket
router.get("/", async (req, res) => {
  const ticket = await Ticket.findAll();
  res.json(ticket);
});

// Get ticket by ID
router.get("/:id", async (req, res) => {
  const ticket = await Ticket.findByPk(req.params.id);
  res.json(ticket);
});

// Create new ticket
router.post("/", async (req, res) => {
  const ticket = await Ticket.create(req.body);
  res.json(ticket);
});

// Update ticket
router.put("/:id", async (req, res) => {
  await Ticket.update(req.body, { where: { ID: req.params.id } });
  res.json({ success: "ticket updated" });
});

// Delete ticket
router.delete("/:id", async (req, res) => {
  await Ticket.destroy({ where: { ID: req.params.id } });
  res.json({ success: "ticket deleted" });
});

module.exports = (app) => app.use("/Ticket", router);
