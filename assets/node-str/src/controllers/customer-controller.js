'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../service/auth-service');
const emailService = require('../service/email-service');

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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(
            req.body.email,
            'Welcome! It`s a good choice!',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o cliente.'
        });
    };
};

exports.authenticate = async (req, res, next) => {

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        };

        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar o cliente.'
        });
    };
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: "CLIENTE DELETADO COM SUCESSO!"
        });
    } catch (e) {
        res.status(500).send({
            message: 'FALHA AO DELETAR O CLIENTE.'
        });
    };
};

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