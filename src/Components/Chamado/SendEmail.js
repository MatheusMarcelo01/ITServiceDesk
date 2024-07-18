const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:  'kingprefeitura.com.br',
    port: 587, 
    secure: false, 
    auth: {
        user: 'cpd@manduri.sp.gov.br', 
        pass: 'ubnt2014' 
    }
});

// Opções do e-mail a ser enviado
const mailOptions = {
    from: 'cpd@manduri.sp.gov.br',
    to: 'cpd@manduri.sp.gov.br',
    subject: 'Teste de envio de e-mail automatico',
    text: 'Olá Mundo'
};

// Enviando o e-mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Erro ao enviar o e-mail:', error);
    } else {
        console.log('E-mail enviado com sucesso:', info.response);
    }
});
