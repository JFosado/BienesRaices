const express = require('express');

const app = express();

const port =3000;
app.listen(port, (request, response)=> {console.log(`El servidor HTTP ha sido iniciado.. \nEl servicio esta escuchando a traves del puerto: ${port}`)}) 


app.get('/',(request,response)=>response.send("Hola web"))

app.get('/quienEres',(request,response)=> response.send("Soy tu primera App Web en arquitectura SOA"))

app.get('/queUsas',(request,response)=> response.send("Estoy construida en el lenguaje JavaScript y utilizao el microservidor de express"))

app.get('/misDatos',(rq,re)=> re.json({nombre: "Jose Angel Fosado Animas", fechaNacimiento: "1998-09-02", matricula: "221004"}))