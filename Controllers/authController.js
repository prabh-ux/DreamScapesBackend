import { userModel } from "../Models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {

            return res.status(409).json({ msg: "user with this email already exist" });
        }

        const newUser = new userModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        
        const token=jwt.sign(
            {email:newUser.email,id:newUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        ) 

        res.status(200).json({ msg: "signup sucessfull" ,success:true,token,name:newUser.name});

    } catch (error) {
        res.status(404).json({ msg: "internal error occured while signing up"+error });
    }

};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(409).json({ msg: "email or password incorrect" });
        }

        const passwordEqual = await bcrypt.compare(password, user.password);

        if (!passwordEqual) {
            return res.status(409).json({ msg: "email or password incorrect" });
        }


        const token = jwt.sign(
            { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          {expiresIn:'24h'}

        )


          res.status(200).json({msg:"Login SucessFull",success:true,token,email,name:user.name});

    } catch (error) {
        res.status(404).json({ msg: "internal error occured while signing up"+error });

    }

}

