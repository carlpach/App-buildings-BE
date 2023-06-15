const express = require('express');
const {getUsers, login, putBuildingUser, register, checkSession} = require('../controllers/users.controller');
const { isAuth } = require('../../middlewares/auth');
const userRoutes = express.Router();

userRoutes.get('/', getUsers)
userRoutes.put('/:id', putBuildingUser);
userRoutes.post('/login', login)
userRoutes.post('/register', register);
userRoutes.get('/checksession', isAuth, checkSession);

module.exports = userRoutes;