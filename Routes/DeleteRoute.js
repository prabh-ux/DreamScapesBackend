import { Router } from "express";
import { ensureJwtValidation } from "../MiddleWare/jwtVerify.js";
import { deleteProjects } from "../Controllers/SaveProject.js";
import { deleteDownlodes } from "../Controllers/saveDownloadedImagesController.js";

const router=Router();

router.delete('/deleteProjects',ensureJwtValidation,deleteProjects);
router.delete('/deleteDownloades',ensureJwtValidation,deleteDownlodes);


export default router;