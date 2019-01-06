let ControllerError = require('../errors/ControllerError');
let Photo = require('../models/Photo');
let multer = require('multer');
let path = require('path');

let storageEngine = multer.diskStorage({
    destination: '../photos',
    filename: (req, file, fn) => {
        fn(null, new Date.getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
    }
});
let upload = multer ({
    storage: storageEngine,
    limits: {fileSize: 200000},
    fileFilter: (req, file, cb) => {
        validateFile(file, cb);
    }
}).single('photo');

let validateFile = (file, cb) => {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimeType);
    if(extension && mimeType){
        return cb(null, true);
    } else{
        cb("Invalid file type.")
    }
}
let controller = {};


controller.get = async(req, res, next) => {
    await Photo.find({}, ['path', 'caption'], (err, photos) => {
        res.status(200).json(photos);
    })
};

controller.create = async (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            throw new ControllerError('qqq', 500);
        }
        else{
            if(req.file == undefined) {
                throw new ControllerError('www', 500);
            }else{
                let fullPath = '../photos/' + req.file.filename;
                let document = {
                    path: fullPath,
                    caption: req.body.caption
                }
                let photo = new Photo(document);
                photo.save((err) => {
                    if(err){
                        throw new ControllerError(`eee`, 500);
                    }
                    res.redirect('http://google.ru');
                })
            }
        }
    })
}

module.exports = controller;