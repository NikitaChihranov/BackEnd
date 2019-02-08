let router = require('express').Router();
let ProductController = require('../controllers/productController');

router.get('/', ProductController.getAll);
router.get('/:name', ProductController.getByName);
router.get('/id/:id', ProductController.getById)
router.post('/', ProductController.create);
router.put('/:name', ProductController.update);
router.delete('/:name', ProductController.delete);
router.post('/deleteAll', ProductController.deleteAll);
router.post('/upload/:id', ProductController.uploadFile);
router.put('/updatePhotos/:id', ProductController.updateFile);

module.exports = router;