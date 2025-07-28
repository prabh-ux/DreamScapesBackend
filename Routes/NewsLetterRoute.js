import { Router } from "express"
import { ensureJwtValidation } from "../MiddleWare/jwtVerify.js";
import { sendMail } from "../Controllers/newsLetterController.js";

const router=Router();

router.post("/newsletter",ensureJwtValidation,sendMail);

export default router;