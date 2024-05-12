const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresaController');

router.get('/', empresasController.gelAllEmpresas);
router.get('/nome/:nome', empresasController.PesquisarEmpresa);
router.get('/senha/nome/:senha/:nome', empresasController.VerificarSenha);
router.post('/', empresasController.CadastrarEmpresas);
router.put('/:cnpj', empresasController.AtualizarEmpresa);
router.delete('/:cnpj', empresasController.DeletarEmpresa);

module.exports = router;