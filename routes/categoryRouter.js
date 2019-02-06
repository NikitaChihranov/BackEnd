let router = require('express').Router();
let CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAll);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:name', CategoryController.delete);
router.post('/deleteAll', CategoryController.deleteAll);
router.get('/viewAll/:id', CategoryController.viewAll);

module.exports = router;