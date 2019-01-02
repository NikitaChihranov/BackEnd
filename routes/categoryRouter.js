let router = require('express').Router();
let CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);
router.post('/deleteAll', CategoryController.deleteAll);
router.get('/viewAll/:id', CategoryController.viewAll);

module.exports = router;