import {request,response} from "express"
import User from "../models/User.js"
import {check,validationResult} from "express-validator"
import { generateToken } from "../lib/tokens.js"
import { emailRegister } from "../lib/emails.js"
const formLogin = (request,response)=> {
    response.render("../views/auth/login.pug",{isLogged:false, page:"LOGIN"})

}


const formRegister = (request, response) =>{
    response.render("../views/auth/register.pug",{page:"Creating a new account..."})
}

const formPasswordRecovery = (request,response)=>{
    response.render("../views/auth/password-recovery.pug",{
        page:"Password Recovery"
    })
}

const insertUser =async(request, response) =>{
    console.log("Intentando registrar los datos del nuevo usuario en la base de datos");
    console.log(`Nombre: ${request.body.name}`);
    
    console.log(`Password: ${request.body.password}`);
    
    await check("name").notEmpty().withMessage("This field is required").run(request)
    
    await check("email").notEmpty().withMessage("This field is required").isEmail().withMessage("Thi is not in email format").run(request)
    
    await check("password").notEmpty().withMessage("This field is required").isLength({min:8}).withMessage("The password must have 8 characters at least").run(request)
    
    await check("confirmPassword").notEmpty().withMessage("This field is required").isLength({min:8}).withMessage("The password must have 8 characters at least").equals(request.body.password).withMessage("Both passwords fields must be the same").run(request)
    
    //response.json(validationResult(request))
    
    console.log(`Se encontraron ${validationResult.length} errores. `)

    let resultValidation=validationResult(request);
    

    const userExists = await User.findOne({where : {email: request.body.email}})

    console.log(userExists);

    const {name,email,password} = request.body;

    if(userExists){
        response.render("../views/auth/register.pug",{
            page:"New Account",
            errors:[{msg:`User with email: ${request.body.email} already exists.`}],
            user: {
                name:request.body.name,
                email: request.body.email
            }
        })
    }else if(resultValidation.isEmpty()){
        const token = generateToken();
        let newUser = await User.create({
            name,email,password,token
        });
        response.render("../views/templates/message.pug",{
            page:"New Account created",
            message:`We have sent an email to ${email}, please verify your account`
        })
        emailRegister({email,name,token})


    } else {
        response.render("../views/auth/register.pug",{
            page:"New Account",
            errors:resultValidation.array(),
            user: {
                name:request.body.name,
                email: request.body.email
            }
        })
    }

    

} 

const confirmAccount = async(request,response) =>{   
    //TODO verificar token
    const tokenRecived = request.params.token
    const userOwner=await User.findOne({where:{token:tokenRecived}})
    if(!userOwner){
        console.log("El token no existe")
    } else {
        console.log("El token existe")
    }

    //TODO actualizar el estado de la verificacion de la tabla usuarios
    //TODO Actualizar al vacio el token de activacion
    //Verificar

}
export {formLogin, formRegister, formPasswordRecovery,insertUser,confirmAccount};