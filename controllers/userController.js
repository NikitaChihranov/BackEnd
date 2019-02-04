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
    if (req.user.firstName === 'not found') {
        console.log('Incorrect login or password');
        let user = new User({ firstName: 'not found'});
        res.status(200).json(user);
    } else {
        res.status(200).json(req.user);
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
        next(new ControllerError (e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try{
        if(req.body.login!==''&&req.body.password!=='') {
            let alreadyExists = await User.findOne({login: req.body.login});
            if (alreadyExists) {
                let user = new User({firstName: 'Already exists!'});
                res.status(201).json(user);
            } else {
                let user = await User.create(req.body);
                res.status(201).json(user);
            }
        }
        else{
            let user = new User({firstName: 'err'});
            res.status(201).json(user);
        }
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.createAdmin = async (req, res, next) => {
    try{
        let user = await User.create(req.body);
        user.admin = true;
        user.save();
        console.log('user works' + user);
        res.status(201).json(user);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.uploadPhoto = async (req, res, next) => {
    let user = await User.findOne({_id: req.params.id});
    if(user) {
        upload(req, res, (err) => {
            if (err) console.log(err);
                let photo = req.file.filename;
                user.photo = photo;
                user.save();
                res.status(200).json(user);
        })
    }else{
        user.photo = 'Photo doesn`t exist';
        user.save();
        console.log('User: ' + user);
        res.status(201).json(user);
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
        if (req.user) {
            next();
        } else {
            console.log('You dont have roots');
        }
}
module.exports = controller;