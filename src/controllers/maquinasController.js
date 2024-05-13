const pool = require('../config/dbConfig');

async function gelAllMaquinas(req, res) {
  const query = 'SELECT * FROM maquinas';
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar todas as máquinas:', err);
    res.status(500).json({ message: 'Erro ao buscar todas as máquinas', error: err.message });
  }
}


async function CadastrarMaquinas(req, res) {
  const { modelo, marca, ano_fabricacao, funcao, potencia, horas_de_uso_diario, empresa_id } = req.body;
  const query = 'INSERT INTO maquinas (modelo, marca, ano_fabricacao, funcao, potencia, horas_de_uso_diario, empresa_id) VALUES ($1, $2, $3, $4, $5, $6, $7) ';
  const values = [modelo, marca, ano_fabricacao, funcao, potencia, horas_de_uso_diario, empresa_id];
  
  try {
    await pool.query(query, values);
    res.status(201).json({ message: 'Máquina cadastrada com sucesso' });
  } catch (err) {
    console.error('Erro ao cadastrar máquina:', err);
    res.status(500).json({ message: 'Erro ao cadastrar máquina', error: err.message });
  }
}

async function PesquisarMaquinaModelo(req, res) {
  const { modelo } = req.params;
  const query = 'SELECT * FROM maquinas WHERE modelo LIKE $1';
  const values = [`%${modelo}%`];
  
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar máquina pelo modelo:', err);
    res.status(500).json({ message: 'Erro ao buscar máquina pelo modelo', error: err.message });
  }
}

async function PesquisarMaquinaMarca(req, res) {
  const { marca } = req.params;
  const query = 'SELECT * FROM maquinas WHERE marca LIKE $1';
  const values = [`%${marca}%`];
  
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar máquina pela marca:', err);
    res.status(500).json({ message: 'Erro ao buscar máquina pela marca', error: err.message });
  }
}

async function AtualizarMaquina(req, res) {
  const { id } = req.params;
  const { modelo, marca, ano_fabricacao, funcao, potencia, horas_de_uso_diario, empresa_id } = req.body;
  const query = 'UPDATE maquinas SET modelo = $1, marca = $2, ano_fabricacao = $3, funcao = $4, potencia = $5, horas_de_uso_diario = $6, empresa_id = $7 WHERE id = $8 RETURNING *';
  const values = [modelo, marca, ano_fabricacao, funcao, potencia, horas_de_uso_diario, empresa_id, id];
  
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao atualizar máquina:', err);
    res.status(500).json({ message: 'Erro ao atualizar máquina', error: err.message });
  }
}

async function DeletarMaquina(req, res) {
  const { id } = req.params;
  const query = 'DELETE FROM maquinas WHERE id = $1 RETURNING *';
  const values = [id];
  
  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Erro ao deletar máquina:', err);
    res.status(500).json({ message: 'Erro ao deletar máquina', error: err.message });
  }
}

module.exports = { 
  gelAllMaquinas, 
  CadastrarMaquinas, 
  PesquisarMaquinaMarca, 
  PesquisarMaquinaModelo, 
  AtualizarMaquina, 
  DeletarMaquina 
};
