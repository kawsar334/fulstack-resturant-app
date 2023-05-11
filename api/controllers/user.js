

import { User } from "../models/User.js";


//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const { username, email, } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { username, email } }, { new: true });
        res.status(200).json({
            message: `${updatedUser.username} Account updated successfully  !`,
            updatedUser,
            success: true,
        });
    } catch (err) {
        next(err);
    }
}
//DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(201).json({
                message: "user not found",
                success: false,
            });
        } else {
            res.status(200).json({
                message: "user  deleted succesfully !",
                success: true,
            })
        }
    } catch (err) {
        next(err);
    }
}


//GET USER
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(200).json({
                message: "user not found!",
                success: false
            });
        } else {

            return res.status(200).json({
                message: `${user.username} Details`,
                success: true,
                user
            });
        }
    } catch (err) {
        next(err);
    }
}
//GET ALL USERS 
export const getAllUsers = async (req, res, next) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
        res.status(200).json({
            message: `user lists  `,
            users,
            success: true,
        });
    } catch (err) {
        next(err);
    }
}

//GET USER STATS 
export const getUserStats = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try {
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {$project:{month:{$month:"$createdAt"}}},
            {$group:{_id:"$month",total:{$sum:1}
            }}
        ])
        res.status(200).json({
            message:`user stats.`, 
            success:true,
            data,
        });

    } catch (err) {
        next(err);
    }
}