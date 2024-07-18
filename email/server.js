const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./auth');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Rota para enviar chamados
app.post('/chamados', (req, res) => {
  const {tecnico, nome, email, tipos, departamento, sobre } = req.body;

  // Configurar o transporte SMTP
  const transporter = nodemailer.createTransport({
    host: config.provedor, // Aqui você acessa config.provedor
    port: 587,
    secure: false,
    auth: {
      user: config.email, // Aqui você acessa config.email
      pass: config.senha // Aqui você acessa config.senha
    }
  });

  // Configurar o email
  const mailOptions = {
    from: config.email,
    to: 'cpd@manduri.sp.gov.br',
    subject: `Novo Chamado Recebido - Responsável TI: ${tecnico}`,
    html: `
      <p>Um novo chamado foi recebido:</p>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tipo de Solicitação:</strong> ${tipos}</p>
      <p><strong>Departamento:</strong> ${departamento}</p>
      <p><strong>Descrição do Problema:</strong> ${sobre}</p>
    `
  };

  // Enviar o email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o email:', error);
      res.status(500).send('Erro ao enviar o email');
    } else {
      console.log('Email enviado:', info.response);
      res.status(200).send('Chamado enviado com sucesso');
    }
  });
});

// Iniciar o servidor
app.listen(port, '192.168.0.98', () => {
  console.log(`Servidor rodando em http://192.168.0.98:${port}`);
});
