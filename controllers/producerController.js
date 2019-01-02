let ControllerError = require('../errors/ControllerError');
let Producer = require('../models/Producer');

let controller = {};

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await Producer.find({}));
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getById = async (req, res, next) => {
    try{
        let id = req.params.id;
        let producer = await Producer.findById(id);
        res.status(200).json(producer);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try{
        let producer = await Producer.create(req.body);
        res.status(201).json(producer);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.update =async (req, res, next) => {
    try{
        let producer = await Producer.findByIdAndUpdate({"_id": req.params.id}, req.body, {new: true});
        res.status(200).json(producer);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try{
        let producer = await Producer.findByIdAndRemove(req.params.id);
        res.status(200).json(producer);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};

module.exports = controller;