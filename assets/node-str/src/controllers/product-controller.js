'use strict';

const Mongoose = require("mongoose");

// IMPORTANDO O SCHEMA
const Product = Mongoose.model('Product');

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Não foi possível cadastrar o produto',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delet = (req, res, next) => {
    res.status(200).send(req.body);
};