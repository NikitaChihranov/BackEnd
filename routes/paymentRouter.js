let router = require('express').Router();
let PaymentController = require('../controllers/paymentController');

router.get('/', PaymentController.getAll);
router.get('/:id', PaymentController.getById);
router.post('/', PaymentController.create);
router.put('/:id', PaymentController.update);
router.delete('/:id', PaymentController.delete);

module.exports = router;