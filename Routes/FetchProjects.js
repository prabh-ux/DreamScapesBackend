import { Router } from "express";
import { ensureJwtValidation } from "../MiddleWare/jwtVerify.js";
import { fetchProjects } from "../Controllers/SaveProject.js";
import { fetchDownloadedImgs } from "../Controllers/saveDownloadedImagesController.js";


const router=Router();

router.get("/savedProjects",ensureJwtValidation,fetchProjects);
router.get("/fetchDownloads",ensureJwtValidation,fetchDownloadedImgs);

export default router;
