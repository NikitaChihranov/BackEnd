let router = require('express').Router();
let AboutController = require('../controllers/aboutController');

router.get('/', AboutController.getAbout);
router.post('/', AboutController.create);
router.post('/uploadPhoto/:id', AboutController.uploadPhoto);
router.put('/', AboutController.update);
router.put('/updatePhoto', AboutController.updatePhoto);
router.delete('/', AboutController.delete);


module.exports = router;