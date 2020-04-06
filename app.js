const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
    Headers setup
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});

app.use('/products', productsRoutes); // Все подрауты продактс будут обработаны этим роутером
app.use('/orders', ordersRoutes);

/*
    404 Handler
 */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

/*
    All errors handler
 */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;