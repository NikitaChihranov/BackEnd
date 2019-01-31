let router = require('express').Router();
let UserController = require('../controllers/userController');
require('../config/passport');
let passport = require('passport');

router.post('/signin', passport.authenticate('local.signin', {failureRedirect: '/'}), UserController.signin);
router.get('/',  UserController.isAuthenticated, UserController.getAll);
router.get('/:id', UserController.isAuthenticated, UserController.getById);
router.post('/',  UserController.create);
router.post('/createAdmin', UserController.createAdmin);
router.post('/uploadPhoto/:id' , UserController.uploadPhoto);
router.put('/:id',UserController.isAuthenticated,  UserController.update);
router.put('/updatePhoto/:id', UserController.isAuthenticated, UserController.updatePhoto);
router.delete('/:id',UserController.isAuthenticated, UserController.delete);
router.post('/deleteAll',UserController.isAuthenticated,UserController.deleteAll);

module.exports = router;