CREATE DATABASE bancoteste;

\c bancoteste;

CREATE TABLE empresas (
    cnpj VARCHAR(14) PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    area_atuacao VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);
INSERT INTO empresas (cnpj, nome, cep, area_atuacao, email, senha) VALUES ('12345678901234', 'Empresa 1', '12345678', 'Agricultura', 'Empresa@gmail.com', '123456');

SELECT * FROM empresas;

CREATE TABLE maquinas (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    ano_fabricacao INTEGER NOT NULL,
    funcao VARCHAR(255) NOT NULL,
    potencia INTEGER NOT NULL,
    horas_de_uso_diario VARCHAR(2) NOT NULL,
    empresa_id VARCHAR(14) NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresas(cnpj)
);
INSERT INTO maquinas (modelo, marca, ano_fabricacao, funcao, potencia, horas_de_uso_diario, empresa_id) VALUES ('Modelo 1', 'Marca 1', 2020, 'Funcao 1', 100, '10', '12345678901234');
SELECT * FROM maquinas;

\dt;