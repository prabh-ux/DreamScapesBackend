import { Router } from "express";
import { ensureJwtValidation } from "../MiddleWare/jwtVerify.js";
import { fetchProjects, saveProjects } from "../Controllers/SaveProject.js";
import { uplode } from "../utils/multer.js";
import { saveDownloadedImages } from "../Controllers/saveDownloadedImagesController.js";


const router=Router();

router.post("/save",ensureJwtValidation,saveProjects);
router.post("/SaveDownloades",ensureJwtValidation,uplode.single("file"),saveDownloadedImages);

export default router;