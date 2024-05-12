const pool = require('../config/dbConfig');

async function gelAllEmpresas(req, res) {
  try {
    const query = 'SELECT * FROM empresas';
    const result = await pool.query(query);
    res.status(200).json(result.rows); 
  } catch (err) {
    console.error('Erro ao buscar empresas:', err);
    res.status(500).json({ message: 'Erro ao buscar empresas', error: err.message }); 
  }
}

async function CadastrarEmpresas(req, res) {
  const {cnpj, nome, cep, area_atuacao, email, senha } = req.body;
  const query = 'INSERT INTO empresas (cnpj, nome, cep, area_atuacao, email, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [cnpj, nome, cep, area_atuacao, email, senha];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao cadastrar empresa:', err);
    res.status(500).json({ message: 'Erro ao cadastrar empresa', error: err.message });
  }
}

async function PesquisarEmpresa(req, res) {
  const { nome } = req.params;
  const query = 'SELECT * FROM empresas WHERE nome LIKE $1';
  const values = [`%${nome}%`];

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar empresa pelo nome:', err);
    res.status(500).json({ message: 'Erro ao buscar empresa pelo nome', error: err.message });
  }
}

async function VerificarSenha(req, res) {
  const { senha, nome } = req.params;
  const query = 'SELECT * FROM empresas WHERE senha = $1 AND nome = $2';
  const values = [senha, nome];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: 'Senha não encontrada para a empresa fornecida' });
    }
  } catch (err) {
    console.error('Erro ao verificar a senha:', err);
    res.status(500).json({ message: 'Erro ao verificar a senha', error: err.message });
  }
}

async function AtualizarEmpresa(req, res) {
  const { cnpj, nome, cep, area_atuacao, email, senha } = req.body;
  const query =  'UPDATE empresas SET cnpj = $1, nome = $2, cep = $3, area_atuacao = $4, email = $5, senha = $6 WHERE cnpj = $7 RETURNING *';
  const values = [cnpj, nome, cep, area_atuacao, email, senha, cnpj];

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao atualizar empresa:', err);
    res.status(500).json({ message: 'Erro ao atualizar empresa', error: err.message });
  }
}

async function DeletarEmpresa(req, res) {
  const { cnpj } = req.params;
  const query = 'DELETE FROM empresas WHERE cnpj = $1';
  const values = [cnpj];

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao deletar empresa:', err);
    res.status(500).json({ message: 'Erro ao deletar empresa', error: err.message });
  }
}

module.exports = {
  gelAllEmpresas,
  CadastrarEmpresas,
  PesquisarEmpresa,
  VerificarSenha,
  AtualizarEmpresa,
  DeletarEmpresa
};
