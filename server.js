require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) console.error('Erro ao conectar no banco:', err);
  else console.log('Conectado ao MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/enviar', (req, res) => {
  const { nome, mensagem } = req.body;
  const query = 'INSERT INTO mensagens (nome, mensagem) VALUES (?, ?)';
  db.query(query, [nome, mensagem], (err) => {
    if (err) res.send('Erro ao enviar.');
    else res.send('Mensagem enviada com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
