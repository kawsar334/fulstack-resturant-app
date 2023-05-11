


import { Order } from "../models/Order.js";


// add new order 
export const neworder = async (req, res, next) => {
    try {
        const newOrders = new Order({
            ...req.body,
            userId: req.user.id
        });
        res.status(200).json({
            message: "order created !",
            success: true,
            newOrders,
        })

    } catch (err) {
        next(err);
    }
}
//UPDATE ORDER
export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({
            message,
            success: true,
            updatedOrder
        })

    } catch (err) {
        next(err);
    }
}
//DELETE ORDER
export const deleteOrder = async (req, res, next) => {
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "order hasbeen deleted !",
            success: true,
        })
    } catch (err) {
        next(err);
    }
}
//GET A ORDER
export const get0rder = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.status(200).json({
            message: "your order lists",
            success: true,
            orders,
        });
    } catch (err) {
        next(err);
    }
}
//GET ALL OREDER

export const getAllorders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            message: "Order Lists ",
            orders,
            success: true,
        })

    } catch (err) {
        next(err);
    }
}

// GET INCOME 
export const getIncome = async (req, res, next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {

        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
            {$group: {_id: "$month",total: { $sum: "$sales" }}}
        ])

        res.status(200).json({
            message: "income stats ",
            success: true,
            income,
        })

    } catch (err) {
        next(err);
    }
}