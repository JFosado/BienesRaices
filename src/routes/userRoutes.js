import express from 'express'
import {formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount, emailChangePassword, updatePassword, authenticateUser} from '../controllers/userController.js';


const router = express.Router();


router.get("/", formLogin)
router.get("/register", formRegister)
router.get("/password-recovery", formPasswordRecovery)
router.post("/password-recovery", emailChangePassword)
router.get("/update-password", updatePassword)
router.post("/register", insertUser)
router.get("/confirm/:token", confirmAccount)
router.post("/", authenticateUser)





export default router;