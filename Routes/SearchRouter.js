import { Router } from "express";
import {ElementController} from "../Controllers/ElementController.js";
import {ensureJwtValidation} from "../MiddleWare/jwtVerify.js";
const router=Router();

router.post("/search",ensureJwtValidation,ElementController);

export default router;