'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// LISTANDO TODOS OS PRODUTOS - BUSCAR TUDO
exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        });
    };
};

// LISTANDO PELO SLUG
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        });
    };
};

// LISTANDO PELO ID
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        });
    };
};

// LISTANDO PELA TAG
exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        });
    }
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O TÍTULO DEVE CONTER PELO MENOS 3 CARACTERES');
    contract.hasMinLen(req.body.slug, 3, 'O SLUG DEVE CONTER PELO MENOS 3 CARACTERES');
    contract.hasMinLen(req.body.description, 3, 'A DESCRIÇÃO DEVE CONTER PELO MENOS 3 CARACTERES');

    // SE OS DADOS FOREM INVÁLIDOS
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o produto.'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "PRODUTO ATUALIZADO COM SUCESSO!"
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar o produto.'
        });
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message: "PRODUTO DELETADO COM SUCESSO!"
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao deletar o produto.'
        });
    };
};