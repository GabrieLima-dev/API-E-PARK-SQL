const express = require("express");
const router = express.Router();
const { Reserva } = require('../models');


router.get("/", async (req, res) => {
  const reserva = await Reserva.findAll();
  res.json(reserva);
});


router.get("/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);

    if (reserva) {
      res.json(reserva);
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    console.error('Erro ao buscar reserva:', error);
    res.status(500).json({ error: "Erro ao buscar reserva" });
  }
});

router.post("/", async (req, res) => {
  try {
    
    const { usuarioid, veiculoid, vagaid, horarioentrada, horariosaida, datareserva } = req.body;
    
    const novaReserva = await Reserva.create({
      usuarioid,
      veiculoid,
      vagaid,
      horarioentrada,
      horariosaida,
      datareserva
    });

    res.status(201).json(novaReserva);
  } catch (error) {
    
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reservaId = req.params.id;
    const updatedReservaInfo = req.body; 

    const [updatedRows] = await Reserva.update(updatedReservaInfo, { where: { id: reservaId } });

    if (updatedRows === 1) {
      res.json({ success: "Reserva updated" });
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    res.status(500).json({ error: "Erro ao atualizar reserva" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reservaId = req.params.id;

  
    const rowsDeleted = await Reserva.destroy({ where: { id: reservaId } });

    if (rowsDeleted) {
      res.json({ success: "Reserva deletada" });
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    console.error('Erro ao excluir reserva:', error);
    res.status(500).json({ error: "Erro ao excluir Reserva" });
  }
});

module.exports = (app) => app.use("/Reserva", router);
