import { DownloadedImgModel } from "../Models/downloadedImage.js";
import cloudinary from "../utils/cloudnary.js";


export const saveDownloadedImages = async (req, res) => {

  try {
    const imageurl = req.file.path;
    const user = req.user.id;
    const image = new DownloadedImgModel({ url: imageurl, userID: user });

    const saved = await image.save();
    if (saved) {
      return res.status(200).json(saved);
    }
  } catch (error) {
    res.status(500).json({ msg: "server error while saving downloded image ", error });
  }

}

export const fetchDownloadedImgs = async (req, res) => {
  try {
    const user = req.user.id;
    const data = await DownloadedImgModel.find({ userID: user });

    if (data) {
      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ msg: "internal error while fetching downloading images ", error });
  }




}

export const deleteDownlodes = async (req, res) => {

  try {

    const { url } = req.body;
    const userID = req.user.id;

    const isavalible = await DownloadedImgModel.findOne({ url: url, userID: userID });

    if (!isavalible) {
      return res.status(404).json("image  not found");
    }

    const segment = url.split('/');
    const filename = segment[segment.length - 1];
    const public_id = `userImages/${filename.split('.')[0]}`;
    await cloudinary.uploader.destroy(public_id);


    //deleting url from mongo db
    await DownloadedImgModel.deleteOne({ url, userID });

    res.status(200).json({ msg: " image deleted sucessfully" });


  } catch (error) {
    console.error("Save Project Error:", error); // Add this

    res.status(500).json({ msg: "Internal server error while saving project ", error });
  }
}