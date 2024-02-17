'use strict';

const { Mongoose } = require("mongoose");

// IMPORTANDO O SCHEMA
const Product = Mongoose.model('Product');

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