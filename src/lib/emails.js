import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path:"src/.env"})

const emailRegister = async(userData) => {
    console.log(`Intentando enviar el corre electronico de activacion de cuenta al usuario ${userData.email}`)
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const {email,name,token} = userData
      //Creando y enviando el correo
      await transport.sendMail({
        from:'221004@utxicotepec.edu.mx',
        to:email,
        subject:'RealState-221004: Verify your account',
        text:'Welcome to RealState-221004, to continue is mandatory that you click on link below to activate your account',
        html:`<!DOCTYPE html>
        <html>
        <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #012E40;
            margin: 0;
            padding: 0;
          }
          .container-img{
            display: grid;
            place-items: center;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
          }
        
          p {
            color: #025159;
          }
        
          a {
            color: #F28705;
            text-decoration: none;
          }
        
          a:hover {
            color: #03A696;
          }
        </style>
        </head>
        <body>
          <div class="container">
          <div class="container-img">
          <a href="https://www.flaticon.es/icono-gratis/casa_619153?k=1698356050466&log-in=google"><img src="../public/img/casa.png" height="50px" width="50px"/></a>
          </div>
          
            <p>Hello ${name} &#128512;</p>
            <p>Thank you for choosing us to search, sell, and buy properties. If you want to continue using our platform, please click the link below:</p>
            <p><a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm${token}">Click here to activate your account</a></p>
            <p>Best Regards</p>
            <p>Jose Angel Fosado Animas</p>
            <p>CEO of RealState-221004</p>
            <p>*If you did not create this account, please ignore this message.</p>
          </div>
        </body>
        </html>`
      });
}
//const emailPasswordRecovery =aync(userData)=>

export {emailRegister};