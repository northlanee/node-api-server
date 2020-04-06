const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET req to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'POST req to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = Number(req.params.productId);
    res.status(200).json({
        message: 'GET req to /products with id ' + id
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = Number(req.params.productId);
    res.status(200).json({
        message: 'PATCH req to /products with id ' + id
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = Number(req.params.productId);
    res.status(200).json({
        message: 'DELETE req to /products with id ' + id
    });
});

module.exports = router;