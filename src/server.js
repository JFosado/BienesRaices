import express from 'express'
import generalRoutes from "./routes/generalRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import propertyRoutes from './routes/propertyRoutes.js'
import db from "./config/db.js"

import helmet from 'helmet'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {User, Property} from './models/relationships.js'

dotenv.config({path:"src/.env"})

const app = express();

 //Definimos el puerto 64400 puertos mtb 1024 - SO


//Agregar y configurar el TemplateEngine 
app.set('view engine','pug')
app.set('views','./src/views')

try {
    db.authenticate();
    console.log("La conexion a la base de datos ha sido exitosa.")
    db.sync();
    console.log("Se han sincronizado las tablas existentes en la base de datos");
} catch (error) {
    console.log("Hubo un error al intentar conectarme a la db.")
    console.log(error)
}

//Habilitamos el acceso a las propiedades del DOM
app.use(express.urlencoded({extended:false}))

// Habilitar cookie parser para leer, escribir y eliminar las cookies en el navegador
app.use(cookieParser({
    cookie:true
}))
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', "'unsafe-eval'"],
//       styleSrc: ["'self'", 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com'],
//       imgSrc: ["'self'", 'data:', 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com', 'https://a.tile.openstreetmap.org', 'https://b.tile.openstreetmap.org', 'https://c.tile.openstreetmap.org'],
//       connectSrc: ["'self'", 'https://tile-provider-domain.com'],
//     },
//   }));
app.listen(process.env.SERVER_PORT, (request, response)=> {
    //Le indicamos a la instancia de express que comience a escuchar las peticiones
    console.log(`El servidor HTTP ha sido iniciado.. \nEl servicio esta escuchando a traves del puerto: ${process.env.SERVER_PORT}`)}) 

//Routing - Controlado las peticiones que se reciben por medio de un endpoint(URL)
app.use('/',generalRoutes)
app.use('/login',userRoutes)
app.use('/properties', propertyRoutes)


app.use(express.static('./src/public'))


//Queda pendiente re.render() -> que pinta una interfaz grafica a traves de un motor de plantillas