import { User } from "../models/User.js"
import jwt from "jsonwebtoken";



import CryptoJS from "crypto-js";
export const Register = async (req, res, next) => {
    const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.CYPTO).toString();

    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(200).json({
                message: "User already registered",
                success: false,
            });
        }else{

            const newUser = new User({ ...req.body, password: hashedPassword });
            const savedUser = await newUser.save();
            res.status(200).json({
                message: "user Registerd  !",
                data: savedUser,
                success: true,
            });
        }

    } catch (err) {
        next(err);
    }
}


//LOGIN

export const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({
                message: "user Not found !",
                success: false,
            });
        } else {
            const hashedPassword = await CryptoJS.AES.decrypt(user.password, process.env.CYPTO);
            if (!hashedPassword) {
                return res.status(403).json({
                    message: "password Not found! ",
                    success: false,
                });
            } else {
                const token = jwt.sign({ id: user._id, user, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: "3d" });
                const { password, ...others } = user._doc;
                res.cookie("token", token, { httpOnly: true }).status(200).json({
                    message: "Login successfull",
                    success: true,
                    others,
                    token,
                })
            }
        }

    } catch (err) {
        next(err);
    }
}