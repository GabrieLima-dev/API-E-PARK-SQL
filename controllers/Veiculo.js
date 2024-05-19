const express = require("express");
const router = express.Router();
const { Veiculo } = require('../models');


// Get all veiculos
router.get('/', async (req, res) => {
    const veiculos = await Veiculo.findAll();
    res.json(veiculos);
  });
  
  // Get veiculo by ID
  router.get('/:id', async (req, res) => {
    const veiculo = await Veiculo.findByPk(req.params.id);
    res.json(veiculo);
  });
  
  // Create new veiculo
  router.post('/', async (req, res) => {
    const veiculo = await Veiculo.create(req.body);
    res.json(veiculo);
  });
  
  // Update veiculo
  router.put('/:id', async (req, res) => {
    await Veiculo.update(req.body, { where: { ID: req.params.id } });
    res.json({ success: 'Veiculo updated' });
  });
  
  // Delete veiculo
  router.delete('/:id', async (req, res) => {
    await Veiculo.destroy({ where: { ID: req.params.id } });
    res.json({ success: 'Veiculo deleted' });
  });

  module.exports = (app) => app.use("/Veiculo", router);