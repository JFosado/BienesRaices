import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config({path:"src/.env"})

//Token Propio
const generateToken=()=>Math.random().toString(32).substring(3)+Date.now().toString(32)+Math.random().toString(32).substring(3);
//JWT
const generateJwt =(userId) => 
    jwt.sign({
        domain:process.env.JWT_DOMAIN,
        signature: process.env.JWT_SIGNATURE,
        author: process.env.JWT_AUTHOR,
        year: process.env.JWT_YEAR,
        userId
    }, process.env.JWT_SECRET_HASH_STRING,
    {
        expiresIn:'1d'
    })




export {generateToken,generateJwt};