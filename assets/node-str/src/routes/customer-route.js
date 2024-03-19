'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.post('/', controller.post);
router.delete('/', controller.delete);
router.get('/', controller.get);

module.exports = router;