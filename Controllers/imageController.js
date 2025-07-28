import { imageModel } from "../Models/image.js";
import cloudinary from "../utils/cloudnary.js";

export const saveUrl = async (req, res) => {

    try {

        const imageUrl = req.file.path;
        const userid = req.user.id;
        const image = new imageModel({ url: imageUrl, userID: userid });
        const saved = await image.save();



        if (saved) {
            return res.status(200).json(saved);
        } else {
            return res.status(500).json({ msg: "internal server error while uploding images" });
        }

    } catch (error) {
        res.status(500).json({ msg: "uplode failed " + error });
    }
};

export const getImages = async (req, res) => {

    try {
       

        const images = await imageModel.find({userID:req.user.id}).sort({ _id: -1 });
        res.status(200).json(images);

    } catch (error) {

        res.status(500).json({ msg: "error getting image" });
    }


}

export const DeleteImage = async (req, res) => {

    try {

        const { url } = req.body;
         console.log(url);
        if (!url) return res.status(404).json({ msg: "no URL provided" });

        const image=await imageModel.findOne({url});
        if(!image){
            return res.status(404).json("image not found");
        }

        if(image.userID.toString()!==req.user.id)
            return res.status(403).json({msg:"Unauthorized to delete"});


        //split the full url based on / and gives an array
        const segment = url.split("/");
        //getting the last element of array
        const fileName = segment[segment.length - 1];
        //spliting the .jpg or etc extention to get public id 
        const public_id = `userImages/${fileName.split(`.`)[0]}`;


        //   deleting image from cloudinary
        await cloudinary.uploader.destroy(public_id);

        //deleting url from mongo db
        await imageModel.deleteOne({ url });

        res.status(200).json({ msg: " Image deleted sucessfully" });


    } catch (error) {
        res.status(500).json({ msg: "can't delete image " + error });
    }

};

export const GenerateImage= async (req,res)=>{



};