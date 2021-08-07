const express = require('express');
const createCategory = require('./controllers/createCategory');
const showCategory = require('./controllers/showCategory');

const router = express.Router();

router.post('/create', createCategory);
router.get('/', showCategory);

module.exports = router;
