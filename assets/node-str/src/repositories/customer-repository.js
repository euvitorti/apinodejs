'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.delete = async (id) => {
    await Customer.findOneAndDelete(id);
};

exports.get = async () => {
    const res = await Customer
        .find({}, 'name email');
    return res;
};

exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
};