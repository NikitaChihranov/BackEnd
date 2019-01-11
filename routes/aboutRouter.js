let router = require('express').Router();
let AboutController = require('../controllers/aboutController');

router.get('/', AboutController.getAbout);
router.post('/', AboutController.create);
router.post('/uploadphoto', AboutController.uploadPhoto);
router.put('/', AboutController.update);
router.delete('/', AboutController.delete);


module.exports = router;