const express = require('express');
const cors = require('cors');
var nodemailer = require('nodemailer');
const firebase = require('./config/admin/firebase-admin-config'); 
const app = express();

//Allow cross-origins requests
app.use(cors());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contato@cybtech.com.br',
    pass: '@#contato2802'
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
    from: 'site@cybtech.com.br',
    to: 'site@cybtech.com.br',
    subject: 'Mensagem enviada através do Site da CYB Tech',
    text:  "Nome do usuário: " + name + "\nE-mail do Usuário: "
     + email + "\nMensagem:\n" + message,
  }
  
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(error)
      res.send("Erro ao enviar")
    } else {
      console.log("Message Sent Succesfully" + info.response);
      res.setHeader('Access-Control-Allow-Origin', '*');
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