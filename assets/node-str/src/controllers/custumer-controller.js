'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O NOME DEVE CONTER PELO MENOS 3 CARACTERES');
    contract.isEmail(req.body.email, 'E-MAIL INVÁLIDO');
    contract.hasMinLen(req.body.password, 6, 'A SENHA DEVE CONTER PELO MENOS 6 CARACTERES');

    // SE OS DADOS FOREM INVÁLIDOS
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o cliente.'
        });
    }
};