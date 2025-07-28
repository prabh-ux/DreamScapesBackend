import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({

    cloud_name:"djtruf3c1",
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_KEY_SECRET,
});

export default cloudinary;