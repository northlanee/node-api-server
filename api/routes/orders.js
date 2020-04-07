const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('./../models/order');
const Product = require('./../models/product');

router.get('/', (req, res, next) => {
    Order.find()
        .select('product quantity _id') // customize fields
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                resultCode: 0,
                count: docs.length,
                data: docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                resultCode: 1,
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    resultCode: 1,
                    message: 'Product not found'
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        }).then(result => {
                console.log(result);
                res.status(201).json({
                    resultCode: 0,
                    data: result
                });
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                resultCode: 1,
                error: err
            });
        });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    Order.findById(id)
        .populate('product', 'name price')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    resultCode: 0,
                    data: doc
                });
            } else {
                res.status(404).json({
                    resultCode: 1,
                    error: 'Not found entry'
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                resultCode: 1,
                error: err
            });
        });
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({_id: id}).exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                resultCode: 0,
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                resultCode: 1,
                error: err
            });
        });
});

module.exports = router;