let ControllerError = require('../errors/ControllerError');
let Order = require('../models/Order');

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
        let order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
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