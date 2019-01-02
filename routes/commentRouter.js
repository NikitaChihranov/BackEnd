let router = require('express').Router();
let CommentController = require('../controllers/commentController');

router.get('/', CommentController.getAll);
router.get('/:id', CommentController.getById);
router.post('/', CommentController.create);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.delete);

module.exports = router;