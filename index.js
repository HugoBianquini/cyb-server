const express = require('express');
const app = express();
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'hugobianqui@hotmail.com',
    pass: 'SiriuLupi1'
  }
});

app.get("/sendEmail", (req, res) => {

  var message = req.query.message;
  var email = req.query.email;
  
  
  if(message != "") {
  
  var mailOptions = {
    from: 'hugobianqui@hotmail.com',
    to: 'hugo@inoveai.com',
    subject: 'Mensagem enviada através do Site da CYB Tech',
    text:  "E-mail do Usuário: "
     + email + "\nMensagem:\n" + message,
  }
  
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(error)
      res.send("Erro ao enviar")
    } else {
      console.log("Message Sent Succesfully" + info.response);
      res.send("Enviado com sucesso")
    }
  })
  } else {
    console.log('Dados incompletos');
  }
  });

var port = process.env.PORT || 3000;

app.listen(port, (erro) => {
  if(erro){
    console.log("Inicialização do servidor falhou");
  } else {
    console.log("Servidor Iniciado!");
  }
});