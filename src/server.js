const express = require('express');
const cors = require('cors');
const empresasRoutes = require('./routes/empresasRoutes');
const maquinasRoutes = require('./routes/maquinasRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Configuração do middleware CORS para permitir solicitações do localhost:8081
app.use(cors({ origin: 'http://localhost:8081' }));

// Habilita o uso de JSON no corpo das requisições
app.use(express.json());

// Rotas
app.use('/empresas', empresasRoutes);
app.use('/maquinas', maquinasRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
