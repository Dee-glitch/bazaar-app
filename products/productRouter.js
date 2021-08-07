const express = require('express');

const showProducts = require('./controllers/showProducts');
const showProduct = require('./controllers/showProduct');
const createProduct = require('./controllers/createProduct');
const getProductByKeyword = require('./controllers/getProductByKeyword');
const updateProduct = require('./controllers/updateProduct');
const deleteProduct = require('./controllers/deleteProduct');
const editProduct = require('./controllers/editProduct');

const router = express.Router();

router.get('/', showProducts);
router.post('/create', createProduct);
router.get('/:id', showProduct);
router.get('/searchedProduct/:keyword', getProductByKeyword);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/update/:id', editProduct);

module.exports = router;
