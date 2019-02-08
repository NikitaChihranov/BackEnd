let router = require('express').Router();
let CommentController = require('../controllers/commentController');

router.get('/', CommentController.getAll);
router.get('/:id', CommentController.getById);
router.get('/commentProduct/:id', CommentController.getCommentsByProduct);
router.post('/', CommentController.create);
router.delete('/:id', CommentController.delete);

module.exports = router;