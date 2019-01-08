let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let MainRouter = require('./routes/index');
let ControllerError = require('./errors/ControllerError');


mongoose.connect('mongodb://localhost:27017/shopDB', {useNewUrlParser: true});
try {
    let app = express();

    app.use(cors({origin: true}))
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(MainRouter);


    app.use((req, res, next) => {
        next(new ControllerError('Not found', 404));
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: err.msg,
            status: err.status
        });
    });
    app.use(express.static('./photos'));
    app.listen(3000, () => {
        console.log('listening...!');
    });
} catch (e) {
    console.log(e);
}