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
        html:`<html>
        <head>
          <style>
            body {
              font-family:system-ui;
              margin: 0;
              padding: 0;
              background-color: #f0eae4;
              letter-spacing: 1px;
              font-size: 2em;
            }
    
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
            }
    
            header {
              text-align: center;
              background-color: #012E40;
              color: #ffffff;
              padding: 10px 0;
            }
    
    
            span {
              font-size: 18px;
              font-weight: normal;
              color: #000000;
            }
    
            p {
              font-size: 14px;
              color: #000000;
              text-align: justify;
              margin: 10px 0;
            }
    
            a {
              display: block;
              width: 200px;
              margin: 0 auto;
              background-color: #012E40;
              color: #ffffff;
              border-radius: 10px;
              padding: 10px 20px;
              text-align: center;
              font-size: 16px;
              text-decoration: none;
              margin-top: 20px;
            }
    
            a:hover{
              background-color:#03A696;
              box-shadow: 2px 2px 2px black;
            }
    
            footer {
              text-align: center;
              background-color: #012E40;
              color: #ffffff;
              padding: 10px 0;
            }
    
            .signature {
              font-size: 14px;
              text-align: left;
              margin: 20px 0;
            }
    
            .resaltado {
        color: red;
        font-weight: bold;
        
        
    }
    
          </style>
        </head>
        <body>
          <div class="container">
          
          <header style="display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; align-items: center;">
    <h1 style="font-size: 28px; font-weight: bold; color: #F28705;">ㅤReal<span style="color: #038C8C;">State</span></h1>
    </div>
    <div>
    <a href="https://www.facebook.com/profile.php?id=100090853385664" style="text-decoration: none; color: #ffffff; margin-right: 5px; display: inline-block; width: 26px; height: 20px; background-color:  #025159; border-radius: 60%10%;text-align: center; line-height: 16px; font-size: 14px;" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
    </a>
    <a href="https://twitter.com/JoseFosado7" style="text-decoration: none; color: #1D2173; margin-right: 5px; display: inline-block; width: 16px; height: 20px; background-color:  #025159; border-radius: 60%10%; text-align: center; line-height: 16px; font-size: 14px;" target="_blank" >
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
    
    </a>
    <a href="https://www.instagram.com/" style="text-decoration: none; color: #1D2173; margin-right: 5px; display: inline-block; width: 16px; height: 20px; background-color:   #025159;border-radius: 60%10%; text-align: center; line-height: 16px; font-size: 14px;" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
    </a>
    <a href="https://github.com/JoseFosado" style="text-decoration: none; color: #1D2173; display: inline-block; width: 16px; height: 20px; background-color:   #025159; border-radius: 60%10%; text-align: center; line-height: 16px; font-size: 14px;" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
    </a>
    </div>
    </header>
    
    
            <fieldset>
              <legend align="center">New account</legend>
        
            <p style="font-size: 18px; margin-top: 20px;">Welcome to RealState-221004, ${name}!</p>
            <p>Thank you for choosing to search, sell, and buy properties. To continue using our platform, please click the link below to activate your account:</p>
            <a href = "http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}">Click here to activate your account.</a>
            <p aling="centrer">Best regards,</p>
            <div class="signature" align="denter">
              <p>Jose Angel Fosado Animas
              </p>
    
              <p>CEO of RealState-221004</p>
            </div>
            <p> <spam class="resaltado"><em>* If you did not create this account, please ignore this email.</em></spam></p>
           
    
          </div>
        </fieldset>
          <footer>
            &copy; RealState-221004
          </footer>
        </body>
      </html>`
      });
}
//const emailPasswordRecovery =aync(userData)=>

export {emailRegister};