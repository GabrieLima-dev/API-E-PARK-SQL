const express = require("express");
const router = express.Router();
const db = require("../models");

const Listar = async (req, res) => {
  const lista = await db.usuario.findAll();
  return res.json(lista);
};

router.get("/listar", Listar);

module.exports = (app) => app.use("/usuario", router);
