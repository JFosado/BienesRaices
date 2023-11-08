import {request,response} from "express"
import User from "../models/User.js"
import {check,validationResult} from "express-validator"
import { generateToken,generateJwt } from "../lib/tokens.js"
import { emailRegister } from "../lib/emails.js"



const formLogin = (request,response)=> {
    response.render("../views/auth/login.pug",{isLogged:false, page:"LOGIN"})

}
const emailChangePassword = async(request,response)=>{
    console.log(`El usuario a solicitado cambiar su contraseña por lo que se le enviara un correo electronico a ${request.body.email}`)
    await check("email").notEmpty().withMessage("YOUR EMAIL IS REQUIRED").isEmail().withMessage("THIS IS NOT EMAIL FORMAT").run(request)

    let resultValidation=validationResult(request);

    

    const {name,email}= request.body
   
    if(resultValidation.isEmpty()){
        const userExists = await User.findOne({where : {email: request.body.email}})
        if(!userExists){
            console.log(`El usuario: ${email} que esta intentando recuperar su contraseña no existe`)
            response.render("../views/templates/message.pug",{
                page:"User not found",
                message:`The user associated with: ${email} does not exist in database`,
                type:"error"
                
            });
        } else {
        
                response.render("../views/auth/password-recovery.pug",{
                    page:"Password recovery",
                    errors:resultValidation.array(),
                    user: {
                        name:request.body.name,
                        email: request.body.email}})
        }
        
        
        emailRegister({email,name,token});
    } else {
        response.render("../views/auth/password-recovery.pug",{
            page:"Password recovery",
                errors:resultValidation.array(),
                user: {
                    name:request.body.name,
                    email: request.body.email}
        })
    }

    
    
}

//TODO Falta hacer la funcion de updatePassword
const updatePassword = (request,response)=>{
    
    return 0;
}


const formRegister = (request, response) =>{
    
    response.render("../views/auth/register.pug",{page:"Creating a new account..."
    })
}

const formPasswordRecovery = (request,response)=>{
    response.render("../views/auth/password-recovery.pug",{
        page:"Password Recovery",
        
    })
}

const insertUser =async(request, response) =>{
    console.log("Intentando registrar los datos del nuevo usuario en la base de datos");
    console.log(`Nombre: ${request.body.name}`);
    
    console.log(`Password: ${request.body.password}`);
    
    await check("name").notEmpty().withMessage("This field is required").run(request)
    
    await check("email").notEmpty().withMessage("This field is required").isEmail().withMessage("This is not in email format").run(request)
    
    await check("password").notEmpty().withMessage("This field is required").isLength({min:8, max:20}).withMessage("The password must have 8 characters at least").run(request)
    
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
            },
            
        })
    }else if(resultValidation.isEmpty()){
        const token = generateToken();
        let newUser = await User.create({
            name,email,password,token
        });
        response.render("../views/templates/message.pug",{
            page:"New Account created",
            message:`We have sent an email to ${email}, please verify your account`,
            
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
        response.render('../views/auth/confirm-account.pug',{
            page:"Status verification",
            error:true,
            msg:"We have found some issues in your"
        })
    } else {
        userOwner.token=null;
        userOwner.verified=true;
        await userOwner.save();
        response.render('../views/auth/confirm-account.pug',{
            page:"Status verification",
            error:false,
            msg:"Your account has been confirmed succesfuly"
        })
    }




    //TODO actualizar el estado de la verificacion de la tabla usuarios
    //TODO Actualizar al vacio el token de activacion
    //Verificar

}
const authenticateUser = async(request,response ) =>{
    //Verificar los campos de correo y contraseña
    await check("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("This is not in email format").run(request)
    await check("password").notEmpty().withMessage("Password field is required").isLength({max:20,min:8}).withMessage("Password must contain between 8 and 20 characters").run(request)

    // En caso de errores mostrarlos en pantalla
    let resultValidation=validationResult(request);
    if(resultValidation.isEmpty()){
        const {email,password} = request.body;
        console.log(`El usuario: ${email} esta intentando acceder a la plataforma`)
        //TODO Verificar que el usuario esta registrado en la base de datos
        const userExists = await User.findOne({where:{email}})
        //TODO En caso de que no exista mostrar pagina de error
        if(!userExists){
            console.log("El ususario no existe")
            response.render("../views/auth/login.pug",{
                page:"Login",
                errors:[{msg:`The user associated to: ${email} was not found`}],
                user: {
                    email
                }
            })
        }else{
            console.log("El usuario existe")
            if(!userExists.verified){
                console.log("Existe, pero no esta verificado");
                //TODO Pintar la pagina de error
                response.render("../views/auth/login.pug",{
                    page:"Login",
                    errors:[{msg:`The user associated to: ${email} was found but not verified`}],
                    user: {
                        email
                    }
                })
            } else{
                if(!userExists.verifyPassword(password)){
                    response.render("../views/auth/login.pug",{
                        page:"Login",
                        errors:[{msg:`User and password does not match`}],
                        user: {
                            email
                        }
                    })
                } else{
                    console.log(`El usuario: ${email} existe y esta autentificado`)
                    // Generar el token de acceso
                    
                    const token = generateJwt(userExists.id);
                    response.cookie('_token',token,{
                        httpOnly:true,
                        //secure:true Esto solo se habilitara en caso de contar con un contrato https
                    }).redirect('/home');
                }
            }
            
        }

    } else{
        response.render("../views/auth/login.pug",{
            page:"Login",
            errors:resultValidation.array(),
            user: {
                email
            }
        })
    }

    return 0;
}

export {formLogin, formRegister, formPasswordRecovery,insertUser,confirmAccount, emailRegister, emailChangePassword, updatePassword, authenticateUser};