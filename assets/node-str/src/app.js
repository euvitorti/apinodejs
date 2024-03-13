'use strict';

// CRIANDO UM SERVIDOR WEB

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// CONECTA AO BANCO - SUA URL PARA O MONGODB
mongoose.connect();

// CARREGA OS MODELS
const Product = require('./models/product');
const Custumer = require('./models/custumer');
const Order = require('./models/order');

// CARREGA AS ROTAS
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const custumerRoute = require('./routes/custumer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', custumerRoute);

module.exports = app;