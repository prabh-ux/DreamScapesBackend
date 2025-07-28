import { Router } from "express";
import { uplode } from "../utils/multer.js";
import { DeleteImage, GenerateImage, getImages, saveUrl } from "../Controllers/imageController.js";
import { ensureJwtValidation } from "../MiddleWare/jwtVerify.js";

const router=Router();

router.post("/uplode", ensureJwtValidation,uplode.single("image"),saveUrl);
router.get("/all",ensureJwtValidation,getImages);
router.delete("/delete",ensureJwtValidation,DeleteImage);
router.delete("/generate",ensureJwtValidation,GenerateImage);

export default router;