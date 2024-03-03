'use strict';

// CRIANDO UM SERVIDOR WEB

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// CONECTA AO BANCO - SUA URL PARA O MONGODB
mongoose.connect('mongodb+srv://jvitorti03:4YYNgMMjhhy7FbXj@cluster0.av48chp.mongodb.net/?retryWrites=true&w=majority');

// CARREGA OS MODELS
const Product = require('./models/product');

// CARREGA AS ROTAS
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;