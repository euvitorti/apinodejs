'use strict';

// IMPORTANDO O SCHEMA
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// LISTANDO TODOS OS PRODUTOS - BUSCAR TUDO
exports.get = (req, res, next) => {
    repository
        .get()
        .find({
            active: true
        }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

// LISTANDO PELO SLUG
exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

// LISTANDO PELO ID
exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

// LISTANDO PELA TAG
exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O TÍTULO DEVE CONTER PELO MENOS 3 CARACTERES');
    contract.hasMinLen(req.body.slug, 3, 'O SLUG DEVE CONTER PELO MENOS 3 CARACTERES');
    contract.hasMinLen(req.body.description, 3, 'A DESCRIÇÃO DEVE CONTER PELO MENOS 3 CARACTERES');

    // SE OS DADOS FOREM INVÁLIDOS
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    repository.update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: "PRODUTO ATUALIZADO COM SUCESSO!"
            });
        }).catch(e => {
            res.status(400).send({
                message: "FALHA AO ATUALIZAR O PRODUTO",
                data: e
            });
        });
};

// TODO - NÃO ESTÁ DELETANDO
exports.delete = (req, res, next) => {
    repository.delete(req.params.id)
        .then(x => {
            res.status(200).send({
                message: "PRODUTO DELETADO COM SUCESSO!"
            });
        }).catch(e => {
            res.status(400).send({
                message: "FALHA AO DELETAR O PRODUTO",
                data: e
            });
        });
};