let router = require('express').Router();
let ProducerController = require('../controllers/producerController');

router.get('/', ProducerController.getAll);
router.get('/:name', ProducerController.getByName);
router.post('/', ProducerController.create);
router.post('/uploadPhoto/:id', ProducerController.uploadPhoto);
router.put('/:id', ProducerController.update);
router.put('/updatePhoto/:id', ProducerController.updatePhoto);
router.delete('/:id', ProducerController.delete);
router.delete('/', ProducerController.deleteAll);
router.get('/viewAll/:id', ProducerController.viewAllProductsByProducer)

module.exports = router;