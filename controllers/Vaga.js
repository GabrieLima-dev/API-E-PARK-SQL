const express = require("express");
const router = express.Router();
const { Vaga } = require('../models');

// Rota total de vagas.
router.get("/", async (req, res) => {
  try {
    const vagas = await Vaga.findAll();
    res.json(vagas);
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

// Rota para contar o número de vagas ocupadas
router.get("/vagas/ocupadas", async (req, res) => {
  try {
    // Contar o número total de vagas ocupadas
    const total = await Vaga.count({ where: { Ocupada: true } });

    // Contar o número de vagas ocupadas preferenciais
    const preferencial = await Vaga.count({ where: { Ocupada: true, Tipo: 'preferencial' } });

    // Contar o número de vagas ocupadas normais
    const normal = await Vaga.count({ where: { Ocupada: true, Tipo: 'normal' } });

    // Retornar a resposta
    res.json({ total, preferencial, normal });
  } catch (error) {
    console.error('Erro ao contar vagas ocupadas:', error);
    res.status(500).json({ error: 'Erro ao contar vagas ocupadas' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vaga = await Vaga.findByPk(req.params.id);
    if (vaga) {
      res.json(vaga);
    } else {
      res.status(404).json({ error: 'Vaga não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar vaga:', error);
    res.status(500).json({ error: 'Erro ao buscar vaga' });
  }
});

router.post("/", async (req, res) => {
  try {
    const { tipo, ocupada } = req.body;
    const novaVaga = await Vaga.create({ tipo, ocupada });
    res.status(201).json(novaVaga);
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { tipo, ocupada } = req.body;
    const [updated] = await Vaga.update(
      { tipo, ocupada },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const vagaAtualizada = await Vaga.findByPk(req.params.id);
      res.json(vagaAtualizada);
    } else {
      res.status(404).json({ error: 'Vaga não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error);
    res.status(500).json({ error: 'Erro ao atualizar vaga' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const vaga = await Vaga.findByPk(req.params.id);
    if (vaga) {
      await Vaga.destroy({ where: { id: req.params.id } });
      res.json({ success: 'Vaga excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Vaga não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir vaga:', error);
    res.status(500).json({ error: 'Erro ao excluir vaga' });
  }
});

module.exports = (app) => app.use("/Vaga", router);
