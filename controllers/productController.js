let ControllerError = require('../errors/ControllerError');
let Product = require('../models/Product');
let fs = require('fs');
let controller = {};
let multer = require('multer');
let path = require('path');
let storageEngine = multer.diskStorage({
    destination: path.join(__dirname, '../public/photos'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storageEngine,
    limits: {fileSize: 200000000}
}).array('photos');

controller.getAll = async (req, res, next) => {
    try {
        res.status(200).json(await Product.find({}));
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getByName = async (req, res, next) => {
    try {
        let product = await Product.findOne({title: req.params.name});
        if (product != null) {
            res.status(200).json(product);
        }else{
            let noExist = new Product({title: 'err'});
            res.status(201).json(noExist);
        }
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getProductsByAuthor = async(req, res, next) => {
    try{
        let products = await Product.find({userIdAuthor: req.params.id});
        console.log(products);
        res.status(200).json(products);
    }catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.getById = async (req, res, next) => {
    try {
        let product = await Product.findOne({_id: req.params.id});
        res.status(200).json(product);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
controller.create = async (req, res, next) => {
    try {
        let product = await Product.create(req.body);
        res.status(201).json(product);
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
            photosToUpload.push(photo.filename);
        }
        product.photos = photosToUpload;
        product.save();
        res.status(200).json(product);
    });
};
controller.update = async (req, res, next) => {
    try {
        let productWithPhotos = await Product.findOne({_id: req.params.id});
        let photos = productWithPhotos.photos;
        for (let i = 0; i < photos.length; i++) {
            fs.unlink('./photos/' + photos[i], (err) => (err));
            console.log(photos[i]);
        }
        let product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        console.log(product);
        res.status(200).json(product);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}
controller.updateFile = async (req, res, next) => {
    try {
        let productToUpdate = await Product.findOne({_id: req.params.id});
        upload(req, res, async (err) => {
            if (err) console.log(err);
            let photosToUpload = [];
            for (const photo of req.files) {
                photosToUpload.push(photo.filename);
            }
            let a = req.files.length;
            for (let q = 0; q < a; q++) {
                productToUpdate.photos.splice(q);
            }
            productToUpdate.photos = photosToUpload;
            productToUpdate.save();
            res.status(200).json(productToUpdate);
        });
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
}

controller.delete = async (req, res, next) => {
    try {
        let product = await Product.findOneAndRemove({_id: req.params.id});
        let photos = product.photos;
        for (let i = 0; i < photos.length; i++) {
            fs.unlink('./public/photos/' + photos[i], (err) => (err));
        }
        res.status(200).json(product);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};

controller.deleteAll = async (req, res, next) => {
    try {
        let products = await Product.find({});
        await Product.deleteMany({}, (err) => {
        });
        for (let product of products) {
            let photos = product.photos;
            for (let i = 0; i < photos.length; i++) {
                fs.unlink('./public/photos/' + photos[i], (err) => (err));
                console.log(photos[i]);
            }
        }
        res.status(200).json(products);
    } catch (e) {
        next(new ControllerError(e.message, 400));
    }
};
module.exports = controller;





