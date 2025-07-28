import pkg from 'multer-storage-cloudinary';
import cloudinary from './cloudnary.js';
import multer from 'multer';


const {CloudinaryStorage} =pkg;

const storage=new CloudinaryStorage({
 cloudinary,
 params:{
    folder:"userImages",
    allowed_formats:["jpg", "png", "jpeg"]
 }


});

export const uplode=multer({storage});