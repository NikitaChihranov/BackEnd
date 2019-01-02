let router = require('express').Router();
let ProducerController = require('../controllers/producerController');

router.get('/', ProducerController.getAll);
router.get('/:id', ProducerController.getById);
router.post('/', ProducerController.create);
router.put('/:id', ProducerController.update);
router.delete('/:id', ProducerController.delete);

module.exports = router;