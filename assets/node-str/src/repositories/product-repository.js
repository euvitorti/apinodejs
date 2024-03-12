'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// LISTANDO TODOS OS PRODUTOS - BUSCAR TUDO
exports.get = async () => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
};

// LISTANDO PELO SLUG
exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');
    return res;
};

// LISTANDO PELO ID
exports.getById = async (id) => {
    const res = await Product
        .findById(id);
    return res;
};

// LISTANDO PELA TAG
exports.getByTag = async (tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
    return res;
};

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
};

exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
};

exports.delete = async (id) => {
    await Product
        .findOneAndDelete(id);
};