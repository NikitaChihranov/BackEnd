let router = require('express').Router();
let ProductController = require('../controllers/productController');

router.get('/', ProductController.getAll);
router.get('/:name', ProductController.getByName);
router.get('/id/:id', ProductController.getById);
router.get('/author/:id', ProductController.getProductsByAuthor);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.post('/deleteAll', ProductController.deleteAll);
router.post('/upload/:id', ProductController.uploadFile);
router.put('/updatePhotos/:id', ProductController.updateFile);

module.exports = router;