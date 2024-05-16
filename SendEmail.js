const nodemailer = require('nodemailer');

// Configurações para o servidor SMTP do Roundcube
const transporter = nodemailer.createTransport({
    host:  'kingprefeitura.com.br',// Substitua pelo host do seu servidor SMTP
    port: 587, // Porta SMTP do Roundcube (ou a porta correta, se diferente)
    secure: false, // true para usar SSL/TLS
    auth: {
        user: 'cpd@manduri.sp.gov.br', // Seu endereço de e-mail
        pass: 'ubnt2014' // Sua senha de e-mail
    }
});

// Opções do e-mail a ser enviado
const mailOptions = {
    from: 'cpd@manduri.sp.gov.br',
    to: 'cpd@manduri.sp.gov.br', // Endereço de e-mail de destino
    subject: 'Teste de envio de e-mail',
    text: 'teste' // Conteúdo do e-mail
};

// Enviando o e-mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Erro ao enviar o e-mail:', error);
    } else {
        console.log('E-mail enviado com sucesso:', info.response);
    }
});
