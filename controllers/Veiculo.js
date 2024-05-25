const express = require("express");
const router = express.Router();
const { sequelize, Veiculo, Usuario } = require('../models');

router.get("/", async (req, res) => {
  try {
    const veiculos = await sequelize.query('SELECT * FROM veiculos', {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (veiculo) {
      res.status(200).json(veiculo);
    } else {
      res.status(404).json({ error: "Veiculo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { usuarioid, modelo, marca, ano, placa } = req.body;

    if (!usuarioid) {
      return res.status(400).json({ error: 'usuarioid é obrigatório' });
    }

    // Verifica se o usuarioid existe no banco de dados
    const usuario = await Usuario.findByPk(usuarioid);
    if (!usuario) {
      return res.status(404).json({ error: 'usuarioid não encontrado' });
    }

    const novoVeiculo = await Veiculo.create({
      usuarioid,
      modelo,
      marca,
      ano,
      placa
    });

    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    res.status(500).json({ error: 'Erro ao criar veículo' });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const veiculoId = req.params.id;
    const updatedVeiculoInfo = req.body; 

    const [updatedRows] = await Veiculo.update(updatedVeiculoInfo, { where: { id: veiculoId } });

    if (updatedRows === 1) {
      res.json({ success: "Veiculo atualizado com sucesso" });
    } else {
      res.status(404).json({ error: "Veiculo não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).json({ error: "Erro ao atualizar veículo" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const veiculoId = req.params.id;

    const rowsDeleted = await Veiculo.destroy({ where: { id: veiculoId } });

    if (rowsDeleted) {
      res.json({ success: "Veiculo deleted" });
    } else {
      res.status(404).json({ error: "Veiculo not found" });
    }
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    res.status(500).json({ error: "Erro ao excluir Veiculo" });
  }
});

module.exports = (app) => app.use("/Veiculo", router);
