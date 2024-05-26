const express = require("express");
const router = express.Router();
const { Ticket } = require('../models');


router.get("/", async (req, res) => {
  const ticket = await Ticket.findAll();
  res.json(ticket);
});


router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: "Ticket não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao buscar ticket:', error);
    res.status(500).json({ error: "Erro ao buscar ticket" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { reservaid, qrCode } = req.body;

    const novoTicket = await Ticket.create({
      reservaid,
      qrCode
    });

    res.status(201).json(novoTicket);
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    res.status(500).json({ error: 'Erro ao criar ticket' });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updatedTicketInfo = req.body; 

    const [updatedRows] = await Ticket.update(updatedTicketInfo, { where: { id: ticketId } });

    if (updatedRows === 1) {
      res.json({ success: "Ticket updated" });
    } else {
      res.status(404).json({ error: "Ticket não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao atualizar Ticket:', error);
    res.status(500).json({ error: "Erro ao atualizar Ticket" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Ticket.destroy({ where: { id: req.params.id } });

    res.json({ success: "Ticket deleted" });
  } catch (error) {
    console.error('Erro ao excluir ticket:', error);
    res.status(500).json({ error: "Erro ao excluir Ticket" });
  }
});

module.exports = (app) => app.use("/Ticket", router);
