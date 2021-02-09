const express = require('express');
var nodemailer = require('nodemailer');
const firebase = require('./config/admin/firebase-admin-config'); 
const app = express();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hugobianqui2001@gmail.com',
    pass: 'siriulupi1'
  }
});


app.get("/getPlanos", (req, res) => {

  firebase.database().ref().child('planos').once('value', (snapshot) => {
    const data = snapshot.val();
    res.json(data);
  })
});



app.get("/sendEmail", (req, res) => {

  var message = req.query.message;
  var email = req.query.email;
  var name = req.query.name;
  
  
  if(message != "") {
  
  var mailOptions = {
    from: 'hugobianqui2001@gmail.com',
    to: 'hugo@inoveai.com',
    subject: 'Mensagem enviada através do Site da CYB Tech',
    text:  "Nome do usuário: " + name + "E-mail do Usuário: "
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