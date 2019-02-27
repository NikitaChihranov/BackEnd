let router = require('express').Router();
let CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getAll);
router.get('/author/:id/from/:dateFrom/to/:dateTo', CategoryController.getCategoryByAuthor);
router.get('/author1/:id', CategoryController.getCategoryByAuthor1);
router.post('/', CategoryController.create);
router.delete('/:id', CategoryController.delete);
router.post('/deleteAll', CategoryController.deleteAll);
router.get('/viewAll/:id', CategoryController.viewAll);

module.exports = router;