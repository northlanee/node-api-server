const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET req to /orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        name: req.body.name,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'POST req to /orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = Number(req.params.orderId);
    res.status(200).json({
        message: 'GET req to /orders with id ' + id
    });
});

router.delete('/:orderId', (req, res, next) => {
    const id = Number(req.params.orderId);
    res.status(200).json({
        message: 'DELETE req to /orders with id ' + id
    });
});

module.exports = router;