'use strict';

const mongoose = require('mongoose');
const Custumer = mongoose.model('Custumer');

// LISTANDO TODOS OS PRODUTOS - BUSCAR TUDO
// exports.get = async () => {
//     const res = await Product.find({
//         active: true
//     }, 'title price slug');
//     return res;
// };

exports.create = async (data) => {
    var custumer = new Custumer(data);
    await custumer.save();
};