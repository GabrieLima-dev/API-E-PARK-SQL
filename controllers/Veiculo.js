const express = require("express");
const router = express.Router();
const { Veiculo } = require('../models');


// Get all veiculos
router.get("/", async (req, res) => {
  const veiculo = await veiculo.findAll();
  res.json(veiculo);
});

  // Get veiculo by ID
  router.get('/:id', async (req, res) => {
    const veiculo = await Veiculo.findByPk(req.params.id);
    res.json(veiculo);
  });
  
  // Create new veiculo
  router.post("/", async (req, res) => {
    try {
      // Crie um novo usuário com todas as informações fornecidas no corpo da requisição
      const veiculo = await Veiculo.create({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        placa: req.body.placa
      });
      res.status(201).json(veiculo);
    } catch (error) {
      // Se ocorrer um erro ao criar o usuário, retorne uma mensagem de erro
      console.error(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  });
  
  // Update veiculo
  router.put('/:id', async (req, res) => {
    await Veiculo.update(req.body, { where: { ID: req.params.id } });
    res.json({ success: 'Veiculo updated' });
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
      res.status(500).json({ error: 'Erro ao excluir Veiculo' });
    }
  });

  module.exports = (app) => app.use("/Veiculo", router);