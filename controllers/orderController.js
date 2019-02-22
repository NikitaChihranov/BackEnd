let ControllerError = require('../errors/ControllerError');
let Order = require('../models/Order');
let Product = require('../models/Product');

let controller = {};

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await Order.find({}));
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getById = async (req, res, next) => {
    try{
        let id = req.params.id;
        let order = await Order.findById(id);
        res.status(200).json(order);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.setDelivered = async (req, res, next) => {
    try {
        let order = await Order.findOne({_id: req.params.id});
        order.status = 'delivered';
        order.save();
        res.status(200).json(order);

    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.setPaid = async(req, res, next) => {
    try{
        let order = await Order.findOne({_id: req.params.id});
        order.status = 'paid';
        order.save();
        res.status(200).json(order);

    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.setClosed = async(req, res, next) => {
    try{
        let order = await Order.findOne({_id: req.params.id});
        order.status = 'closed';
        order.save();
        res.status(200).json(order);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getOrdersByUser = async (req, res, next) => {
    try{
        let orders = await Order.find({userId: req.params.id});
        res.status(200).json(orders);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getAmountOfOrdersForAllProducts = async (req, res, next) => {
    try{
        let products = await Product.find({});
        let amounts = [];
        for(let product of products) {
            let orders = await Order.find({product: product.title});
            let length = orders.length;
            amounts.push(length);
        }
        res.status(200).json(amounts);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.create = async (req, res, next) => {
    try{
        let order = await Order.create(req.body);
        res.status(201).json(order);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.update =async (req, res, next) => {
    try{
        let reqBody1 =JSON.stringify(req.body);
        let reqBody2 = JSON.parse(reqBody1);
        console.log(reqBody2);
        console.log(100);
        let order = await Order.findByIdAndUpdate(req.params.id, reqBody2, {new: true});
        console.log(order);
        res.status(200).json(order);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try{
        let order = await Order.findByIdAndRemove(req.params.id);
        res.status(200).json(order);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};

module.exports = controller;