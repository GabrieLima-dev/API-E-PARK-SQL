const express = require("express");
const router = express.Router();
const { sequelize, Veiculo, Usuario } = require('../models');

// Get all veiculos
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

// Get veiculo by ID
router.get("/:id", async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.id);
    if (veiculo) {
      res.json(veiculo);
    } else {
      res.status(404).json({ error: "Veiculo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Create new veiculo
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

// Update veiculo
router.put('/:id', async (req, res) => {
  try {
    const { usuarioid, Marca, Modelo, Ano, Placa } = req.body;
    const [updated] = await Veiculo.update(
      { usuarioid, Marca, Modelo, Ano, Placa },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedVeiculo = await Veiculo.findByPk(req.params.id);
      res.json(updatedVeiculo);
    } else {
      res.status(404).json({ error: 'Veiculo not found' });
    }
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).json({ error: 'Erro ao atualizar veículo' });
  }
});

// Delete veiculo
router.delete("/:id", async (req, res) => {
  try {
    // Exclua o usuário com o ID fornecido
    await Veiculo.destroy({ where: { id: req.params.id } });

    // Se a exclusão for bem-sucedida, retorne uma resposta de sucesso
    res.json({ success: "Veiculo deleted" });
  } catch (error) {
    // Se ocorrer um erro durante a exclusão, retorne uma mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir Veiculo" });
  }
});

module.exports = (app) => app.use("/Veiculo", router);
