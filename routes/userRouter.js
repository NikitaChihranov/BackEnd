let router = require('express').Router();
let UserController = require('../controllers/userController');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
router.post('/deleteAll', UserController.deleteAll);

module.exports = router;