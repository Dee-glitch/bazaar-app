const express = require('express');

const ShowOrders = require('./controllers/showOrders');
const ShowOrder = require('./controllers/showOrder');
const CreateOrder = require('./controllers/createOrder');
const DeleteOrder = require('./controllers/deleteOrder');
const CheckOut = require('./controllers/checkout');

const router = express.Router();

router.get('/', ShowOrders);

router.get('/:id', ShowOrder);

router.post('/create', CreateOrder);

router.post('/checkout', CheckOut);

router.delete('/:id', DeleteOrder);

module.exports = router;
