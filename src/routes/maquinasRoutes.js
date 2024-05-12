const express = require('express');
const router = express.Router();
const maquinasController   = require("../controllers/maquinasController");


router.get("/",maquinasController.gelAllMaquinas);
router.get("/marca/:marca", maquinasController.PesquisarMaquinaMarca);
router.get("/modelo/:modelo", maquinasController.PesquisarMaquinaModelo);
router.post("/", maquinasController.CadastrarMaquinas);
router.put("/:id", maquinasController.AtualizarMaquina);
router.delete("/:id", maquinasController.DeletarMaquina);

module.exports= router;