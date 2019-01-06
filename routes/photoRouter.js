let router = require('express').Router();
let PhotoController = require('../controllers/photoController');

router.get('/', PhotoController.get);
router.post('/', PhotoController.create);

module.exports = router;