let ControllerError = require('../errors/ControllerError');
let Product = require('../models/Product');
let fs = require('fs');
let controller = {};
let multer = require('multer');
let path = require('path');
let storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../photos'));
    },
    filename: (req, file, fn) => {
        fn(null, new Date.getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
    }
});


let validateFile = (file, cb) => {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimeType);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type.")
    }
}

let upload = multer({
    storage: storageEngine,
    limits: {fileSize: 200000},
    fileFilter: (req, file, cb) => {
        validateFile(file, cb);
    }
});




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

controller.uploadFile = async (req, res) => {

    upload(req, res, async (err) => {
         if(err) console.log(err);
                let product1 = await Product.findById(req.id);
                console.log(product1);
                 for( const photo of product1.photos) {
                    product1.photos.push(photo.path+',');
                    console.log(product1.photos);
                }
                 let photos1=product1.photos;
                 let product = await Product.findByIdAndUpdate(req.body.id, {photos: photos1},{new: true} );
                res.contentType('image/jpeg');
                res.status(200).json(product);
         });
}
module.exports = controller;





