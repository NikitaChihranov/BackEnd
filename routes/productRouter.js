let router = require('express').Router();
let ProductController = require('../controllers/productController');

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.post('/deleteAll', ProductController.deleteAll);

module.exports = router;