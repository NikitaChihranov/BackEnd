let ControllerError = require('../errors/ControllerError');
let Category = require('../models/Category');
let Product = require('../models/Product');
let controller = {};

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await Category.find({}));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getCategoryByAuthor = async (req, res, next) => {
    try {
        let categories = await Category.find({userIdAuthor: req.params.id});
        console.log(categories);
        res.status(200).json(categories);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.create = async (req, res, next) => {
    try {
        let category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try {
        let category = await Category.findOneAndRemove({_id: req.params.id});
        res.status(200).json(category);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.deleteAll = async (req, res, next) => {
    try {
        res.json(await Category.deleteMany({}, (err) => {
        }));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.viewAll = async (req, res, next) => {
    try {
        let id = req.params.id;
        let catToFind = await Category.findOne({_id: id});
        res.json(await Product.find({'category': catToFind.title}));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
module.exports = controller;