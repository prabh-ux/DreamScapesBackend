import mongoose from "mongoose";
import { saveModel } from "../Models/save.js";

export const saveProjects = async (req, res) => {

    try {

        const { name, size, droppedElements, BGColor } = req.body;
        const user = req.user.id;

        const isNameSame = await saveModel.findOne({ name: name, user: user });

        if (isNameSame) {
            return res.status(404).json({ msg: "this name is already register to another project" });
        }


        const newProject = new saveModel({
            name,
            size,
            droppedElements,
            BGColor,
            user

        })

        const saved = await newProject.save();


        res.status(200).json(saved);



    } catch (error) {
        console.error("Save Project Error:", error); // Add this

        res.status(500).json({ msg: "Internal server error while saving project ", error });
    }
}

export const fetchProjects = async (req, res) => {

    try {
        const projectData = await saveModel.find({ user: req.user.id })

        res.status(200).json(projectData);

    } catch (error) {
        res.status(500).json({ msg: "error fetching projects" });

    }


}

export const deleteProjects = async (req, res) => {

    try {

        const { name, user } = req.body;
        const userID = req.user.id;

        const isavalible = await saveModel.findOne({ name: name, user: userID });

        if (!isavalible) {
            return res.status(404).json("project  not found");
        }

        if (user.toString() !== userID)
            return res.status(403).json({ msg: "Unauthorized to delete" });

        //deleting url from mongo db
        await saveModel.deleteOne({ user ,name});

        res.status(200).json({ msg: " project deleted sucessfully" });





    } catch (error) {
        console.error("Save Project Error:", error); // Add this

        res.status(500).json({ msg: "Internal server error while saving project ", error });
    }
}