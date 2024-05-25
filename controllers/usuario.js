const express = require("express");
const router = express.Router();
const { Usuario } = require("../models");

router.get("/", async (req, res) => {
  const usuario = await Usuario.findAll();
  res.json(usuario);
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});


router.post("/", async (req, res) => {
  try {
    // Crie um novo usuário com todas as informações fornecidas no corpo da requisição
    const usuario = await Usuario.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      foto: req.body.foto
    });
    res.status(201).json(usuario);
  } catch (error) {
    // Se ocorrer um erro ao criar o usuário, retorne uma mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserInfo = req.body; 

    const [updatedRows] = await Usuario.update(updatedUserInfo, { where: { id: userId } });

    if (updatedRows === 1) {
      res.json({ success: "Usuario updated" });
    } else {
      res.status(404).json({ error: "Usuario not found" });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Exclua o usuário com o ID fornecido
    await Usuario.destroy({ where: { id: req.params.id } });

    // Se a exclusão for bem-sucedida, retorne uma resposta de sucesso
    res.json({ success: "Usuario deleted" });
  } catch (error) {
    // Se ocorrer um erro durante a exclusão, retorne uma mensagem de erro
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

module.exports = (app) => app.use("/Usuario", router);
