let ControllerError = require('../errors/ControllerError');
let Comment = require('../models/Comment');
let controller = {};

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await Comment.find({}));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getCommentsByProduct = async(req, res, next) => {
    try {
        let comments = await Comment.find({product: req.params.id});
        if(comments.length === 0){
            let comment = new Comment({text: 'no found'});
            res.status(201).json(comment);
        }else{
            res.status(200).json(comments);
        }
    }catch(e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.getById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try {
        let comment = await Comment.create(req.body);
        console.log(comment);
        res.status(201).json(comment);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};

controller.delete = async (req, res, next) => {
    try {
        let comment = await Comment.findByIdAndRemove(req.params.id);
        res.status(200).json(comment);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};

module.exports = controller;