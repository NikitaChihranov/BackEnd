let ControllerError = require('../errors/ControllerError');
let About = require('../models/About');
let controller = {};
controller.getAbout = async (req, res, next) => {
    try {
        let about = await About.findOne({});
        res.status(200).json(about);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.create = async (req, res, next) => {
    try {
        let AboutContent = await About.find({});
        if (AboutContent.length==0) {
            let aboutText = await About.create(req.body);
            res.status(200).json(aboutText);
            console.log(aboutText);
        } else {
            next(new ControllerError("xxx", 400));
        }
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.update = async (req, res, next) => {
    try {
        let aboutToUpdate = await About.findOneAndUpdate({}, {$set: {text: req.body.text}});
        console.log(aboutToUpdate);
        res.status(200).json(aboutToUpdate);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try {
        let aboutToDelete = await About.findOneAndRemove({}, () => {
        });
        console.log(aboutToDelete);
        res.status(200).json(aboutToDelete);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
module.exports = controller;