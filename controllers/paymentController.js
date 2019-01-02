let ControllerError = require('../errors/ControllerError');
let Payment = require('../models/Payment');

let controller = {};

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await Payment.find({}));
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getById = async (req, res, next) => {
    try{
        let id = req.params.id;
        let payment = await Payment.findById(id);
        res.status(200).json(payment);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try{
        let payment = await Payment.create(req.body);
        res.status(201).json(payment);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.update =async (req, res, next) => {
    try{
        let payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(payment);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try{
        let payment = await Payment.findByIdAndRemove(req.params.id);
        res.status(200).json(payment);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};

module.exports = controller;