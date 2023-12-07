import express from 'express'
import { formLogin, formPasswordRecovery, formRegister, userHome, insertUser, confirmAccount, updatePassword, authenticateUser, emailChangePassword, formPasswordUpdate } from "../controllers/userController.js";
import { protectRoute } from '../middlewares/protectRoute.js';



const router = express.Router();
router.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));
router.get("/login", formLogin) //Login
router.get("/login/register", formRegister) //Vista registro  
router.post("/login/register", insertUser); //Registrar usuario
router.get("/login/confirm/:token", confirmAccount);//Confirmar correo
router.get("/login/password-recovery", formPasswordRecovery); //olvide mi contraseña
router.post("/login/password-recovery", emailChangePassword);
router.post("/login", authenticateUser) //Login funcional
router.get("/login/update-password/:token", formPasswordUpdate); //Comprobar token
router.post("/login/update-password/:token", updatePassword); //Nuevo passwordrouter.get('/', (request, response) => response.render("layout/index.pug", { page: "Home" }));//MI ENDPOINT DE PINTADOS
router.get("/home", userHome)//Vista de cada usuario



export default router;