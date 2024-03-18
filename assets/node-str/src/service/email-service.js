'use strict';
var config = require('../config');
var sendGrid = require('sendGrid')(config.sendgridkey);

exports.send = async (to, subject, body) => {
    sendGrid.send({
        to: to,
        from: 'email de origem',
        subject: subject,
        html: body
    });
};