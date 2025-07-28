import { Router } from "express";
import { loginValidator, signUpValidator } from "../MiddleWare/authValidator.js";
import { login, signUp } from "../Controllers/authController.js";

const router=Router();


router.post('/login',loginValidator,login);
router.post('/signup',signUpValidator,signUp);

export default router;