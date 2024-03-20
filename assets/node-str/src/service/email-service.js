'use strict';
var config = require('../config');
var sendGrid = require('sendgrid')(config.sendgridkey);

exports.send = async (to, subject, body) => {
    sendGrid.send({
        to: to,
        from: 'email',
        subject: subject,
        html: body
    });
};