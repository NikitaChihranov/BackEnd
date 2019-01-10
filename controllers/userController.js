let ControllerError = require('../errors/ControllerError');
let User = require('../models/User');

let controller = {};

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await User.find({}));
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getById = async (req, res, next) => {
    try{
        let id = req.params.id;
        let user = await User.findById(id);
        res.status(200).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try{
        let user = await User.create(req.body);
        res.status(201).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.update =async (req, res, next) => {
    try{
        let user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try{
        let user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.deleteAll = async (req, res, next) => {
    try {
        res.json(await User.deleteMany({}, (err) => {
        }));
    } catch (e) {
        console.log(e);
        next(new ControllerError(e.message, 400));
    }
}
module.exports = controller;