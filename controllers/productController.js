let ControllerError = require('../errors/ControllerError');
let Product = require('../models/Product');

let controller = {};

controller.getAll = async (req, res, next) => {
        try {
            res.status(200).json(await Product.find({}));
        }catch (e) {
            next(new ControllerError(e.message, 400));
        }
};
controller.getById = async (req, res, next) => {
    try{
        let id = req.params.id;
        let product = await Product.findById(id);
        res.status(200).json(product);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try{
        let product = await Product.create(req.body);
        res.status(201).json(product);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.update =async (req, res, next) => {
    try{
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(product);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try{
        let product = await Product.findByIdAndRemove(req.params.id);
        res.status(200).json(product);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.deleteAll = async (req, res, next) => {
    try {
        res.json(await Product.deleteMany({}, (err) => {
        }));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
module.exports = controller;