import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path:"src/.env"})
//Configuracion de Sequielize
const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'mysql',
    define:{
        timestamps:true
    },
    //Propiedades del usuario
    pool:{
        max:5, //Usuarios
        min:0,
        acquire:30000, //El tiempo que va a esperar a recibir una peticion
        idle:10000 //Suspende la conexion mientras no se ingresa nada
    },
    operatorAliases:false
});

export default db;