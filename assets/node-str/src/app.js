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
const Costumer = require('./models/costumer');
const Order = require('./models/order');

// CARREGA AS ROTAS
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;