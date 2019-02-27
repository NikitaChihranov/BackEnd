let router = require('express').Router();
let ProducerController = require('../controllers/producerController');

router.get('/', ProducerController.getAll);
router.get('/:name', ProducerController.getByName);
router.get('/author/:id/from/:dateFrom/to/:dateTo', ProducerController.getProducerByAuthor);
router.get('/author1/:id', ProducerController.getProducerByAuthor1);
router.post('/', ProducerController.create);
router.post('/uploadPhoto/:id', ProducerController.uploadPhoto);
router.put('/:id', ProducerController.update);
router.put('/updatePhoto/:id', ProducerController.updatePhoto);
router.delete('/:id', ProducerController.delete);
router.delete('/', ProducerController.deleteAll);
router.get('/viewAll/:id', ProducerController.viewAllProductsByProducer);

module.exports = router;