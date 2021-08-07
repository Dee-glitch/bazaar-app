const express = require('express');

const showUsers = require('./controllers/showUsers');
const showUser = require('./controllers/showUser');
const createUser = require('./controllers/createUser');
const updateUser = require('./controllers/updateUser');
const deleteUser = require('./controllers/deleteUser');
const signIn = require('./controllers/signIn');
const googleLogin = require('./controllers/googleLogin');
const facebookLogin = require('./controllers/facebookLogin');

const router = express.Router();

router.get('/', showUsers);

router.get('/:id', showUser);

router.post('/signup', createUser);

router.patch('/update/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/signin', signIn);

router.post('/facebookLogin', facebookLogin);

router.post('/googleLogin', googleLogin);

module.exports = router;
