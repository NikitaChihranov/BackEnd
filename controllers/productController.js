let ControllerError = require('../errors/ControllerError');
let Product = require('../models/Product');
let fs = require('fs');
let controller = {};
let multer = require('multer');
let path = require('path');
let storageEngine = multer.diskStorage({
    destination: path.join(__dirname, '../photos'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storageEngine,
    limits: {fileSize: 200000000}
}).array('photos');

controller.getAll= async (req, res, next) => {
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
    // let productToUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    let productToUpdate = await Product.findById(req.params.id);
    upload(req, res, async (err) => {
        if (err) console.log(err);
        let namesOfFileToDelete = productToUpdate.photos;

        for (let file of namesOfFileToDelete) {
            fs.unlink('../photos/' + namesOfFileToDelete[file]);
            console.log('photo deleted');
        }
        let a = productToUpdate.photos.length;
        for (let q = 0; q < a; q++){
            productToUpdate.photos.splice(q);
        }
        let photosToUpload = [];
        for (const photo of req.files) {
            let a = photo.path.split(`\\`);
            console.log(a);
            let b = a.length;
            photosToUpload.push(a[b-1]);
        }
        console.log(photosToUpload);
        productToUpdate.photos = photosToUpload;
        console.log(productToUpdate);
        res.status(200).json(productToUpdate);
    });
    }
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

controller.uploadFile = async (req, res, next) => {
        upload(req, res, async (err) => {
            if (err) console.log(err);
            let product = await Product.findById(req.params.id);
            let photosToUpload = [];
                for (const photo of req.files) {
                    let a = photo.path.split(`\\`);
                    console.log(a);
                    let b = a.length;
                    photosToUpload.push(a[b-1]);
                }
                console.log(photosToUpload);
                product.photos = photosToUpload;
                product.save();
                res.status(200).json(product);
            });
}
module.exports = controller;





