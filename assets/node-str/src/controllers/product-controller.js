'use strict';

const { Mongoose } = require("mongoose");

// IMPORTANDO O SCHEMA
const Product = Mongoose.model('Product');

// LISTANDO TODOS OS PRODUTOS - BUSCAR TUDO
exports.get = (req, res, next) => {
    Product
        .find({
            active: true
        }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    
    res.status(201).send(req.body);
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