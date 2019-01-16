let ControllerError = require('../errors/ControllerError');
let User = require('../models/User');
let fs = require('fs');
let path = require('path');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/userPhotos'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage,
    limits: {fileSize: 30000000}
}).single('photo');

let controller = {};
controller.signin = async (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        res.status(200).json(req.user);
    } else {
        console.log('Incorrect login or password');
    }
}
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
        console.log('Request user:' +req.user);
        let user = await User.create(req.body);
        console.log(user);
        res.status(201).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.uploadPhoto = async (req, res, next) => {
    let user = await User.findOne({_id: req.params.id});
    try{
        upload(req, res, (err) => {
            if(err) console.log(err);
            let photo = req.file.filename;
            user.photo = photo;
            user.save();
            res.status(200).json(user);
        })
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.update = async (req, res, next) => {
    try{
        let userWithPhoto = await User.findOne({_id: req.params.id});
        fs.unlink('./public/userPhotos/' + userWithPhoto.photo, (err) => (err));
        let user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.updatePhoto = async (req, res, next) => {
    let user = await User.findOne({_id: req.params.id});
    try{
        upload(req, res, (err) => {
            if(err) console.log(err);
            user.photo = req.file.filename;
            user.save();
            res.status(200).json(user); 
        })
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.delete = async (req, res, next) => {
    try{
        let userWithPhoto = await User.findOne({_id:req.params.id});
        fs.unlink('./public/userPhotos/' + userWithPhoto.photo, (err) => (err));
        let user = await User.findByIdAndRemove(req.params.id);
        res.status(200).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.deleteAll = async (req, res, next) => {
    try {
        let users = await User.find({});
        for(let user of users) {
            fs.unlink('./public/userPhotos/' + user.photo, (err) => (err));
        }
        res.json(await User.deleteMany({}, (err) => {}));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.isAuthenticated = async (req, res, next) => {
    console.log(req.user);
    try {
        if (req.user) {
            next();
        } else {
            console.log('You don`t have roots to do it');
        }
    }catch(e) {
        console.log(e);
        next(new ControllerError(e.message, 400));
    }
}
module.exports = controller;