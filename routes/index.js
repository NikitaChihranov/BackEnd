let router = require('express').Router();

let ProductRouter = require('./productRouter');
let CategoryRouter = require('./categoryRouter');
let CommentRouter = require('./commentRouter');
let OrderRouter = require('./orderRouter');
let PaymentRouter = require('./paymentRouter');
let ProducerRouter = require('./producerRouter');
let UserRouter = require('./userRouter');
let AboutRouter = require('./aboutRouter');
let PhotoRouter = require('./photoRouter');

router.use('/products', ProductRouter);
router.use('/categories', CategoryRouter);
router.use('/comments', CommentRouter);
router.use('/photos', PhotoRouter)
router.use('/orders', OrderRouter);
router.use('/payments', PaymentRouter);
router.use('/producers', ProducerRouter);
router.use('/users', UserRouter);
router.use('/about', AboutRouter);

module.exports = router;