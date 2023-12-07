import jsonWebToken from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';
dotenv.config({path:"src/.env"})

const protectRoute= async(request, response, next) =>{
    console.log(request.cookies)
    const {_token} = request.cookies
    //Verificar que el token existe
    if(!_token){
        return response.redirect('/login')
    }
    //TODO:Verificar el token
    try {
        const decoded =jsonWebToken.verify(_token, process.env.JWT_SECRET_HASH_STRING)
        const loggedUser = await  User.findByPk(decoded.userID)
        console.log(loggedUser);
        if(loggedUser){
            request.user = loggedUser;
        } else {
            return response.redirect('/login')
        }
    } catch (err) {
        console.log(err);
    }

    
    next();
}

export {protectRoute}