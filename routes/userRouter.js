let router = require('express').Router();
let UserController = require('../controllers/userController');
require('../config/passport');
let passport = require('passport');

router.post('/signin', passport.authenticate('local.signin', {failureRedirect: '/'}), UserController.signin);
router.get('/all', UserController.isAuthenticated, UserController.getAll);
router.get('/',  UserController.isAuthenticated, UserController.getAllApartSuper);
router.get('/admins', UserController.isAuthenticated, UserController.getAllAdmins);
router.get('/:login', UserController.isAuthenticated, UserController.getByLogin);
router.post('/',  UserController.create);
router.post('/createAdmin', UserController.createAdmin);
router.post('/uploadPhoto/:id' , UserController.uploadPhoto);
router.put('/:id',UserController.isAuthenticated,  UserController.update);
router.put('/updatePhoto/:id', UserController.isAuthenticated, UserController.updatePhoto);
router.delete('/delete/:id',UserController.isAuthenticated, UserController.delete);
router.delete('/deleteProfile', UserController.deleteProfile, UserController.logout);
router.post('/deleteAll',UserController.isAuthenticated,UserController.deleteAll);

module.exports = router;