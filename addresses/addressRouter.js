const express = require('express');
const showAddress = require('./controllers/showAddress');
const createAddress = require('./controllers/createAddress');
const showAddresses = require('./controllers/showAddresses');
const deleteAddress = require('./controllers/deleteAddress');
const updateAddress = require('./controllers/updateAddress');

const router = express.Router();

router.get('/:id', showAddress);
router.post('/create', createAddress);
router.get('/all/:id', showAddresses);
router.patch('/delete/:addressId/:userId', deleteAddress);
router.patch('/update/:id', updateAddress);

module.exports = router;
