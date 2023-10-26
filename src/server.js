import express from 'express'
import generalRoutes from "./routes/generalRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import db from "./config/db.js"
import User from "./models/User.js"

const app = express();

const port =3000; //Definimos el puerto 64400 puertos mtb 1024 - SO


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

app.listen(port, (request, response)=> {
    //Le indicamos a la instancia de express que comience a escuchar las peticiones
    console.log(`El servidor HTTP ha sido iniciado.. \nEl servicio esta escuchando a traves del puerto: ${port}`)}) 

//Routing - Controlado las peticiones que se reciben por medio de un endpoint(URL)
app.use('/',generalRoutes)
app.use('/login',userRoutes)



app.use(express.static('./src/public'))

//Queda pendiente re.render() -> que pinta una interfaz grafica a traves de un motor de plantillas