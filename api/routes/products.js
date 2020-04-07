const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('./../models/product');

router.get('/', (req, res, next) => {
    Product.find().exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
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
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                resultCode: 0,
                data: result
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                resultCode: 1,
                error: err
            });
        });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
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

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    console.log(req.body);
    for (const ops in req.body) {
        if (req.body.hasOwnProperty(ops))
            updateOps[ops] = req.body[ops];
    }
    Product.update({_id: id}, { $set: updateOps }).exec()
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

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id}).exec()
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