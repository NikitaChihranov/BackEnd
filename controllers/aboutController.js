let ControllerError = require('../errors/ControllerError');
let About = require('../models/About');
let controller = {};
let multer = require('multer');
let path = require('path');
let storageEngine = multer.diskStorage({
    destination: path.join(__dirname, '../photosAbout'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storageEngine,
    limits: {fileSize: 200000000}
}).single('photo');
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
controller.uploadPhoto = async (req, res, next) => {
    let about = await About.findById(req.params.id);
    try{
        upload (req, res, (err) => {
            if(err) console.log(err);
            let photoToUpload = req.file.filename;
                about.logo = photoToUpload;
                about.save();
                res.status(200).json(about);
        })
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.update = async (req, res, next) => {
    try {
        let aboutToUpdate = await About.find({});
        let id = aboutToUpdate[0]._id;
        let obj = await About.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(obj);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.delete = async (req, res, next) => {
    try {
        let aboutToDelete = await About.find({});
        let id = aboutToDelete[0]._id;
        await About.findByIdAndRemove(id);
        let about = new About();
        about.text = '';
        about.logo = '';
        res.status(200).json(about);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
module.exports = controller;