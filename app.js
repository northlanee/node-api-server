const express = require('express');
const app = express();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use('/products', productsRoutes); // Все подрауты продактс будут обработаны этим роутером
app.use('/orders', ordersRoutes);

module.exports = app;