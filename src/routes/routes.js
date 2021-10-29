const express = require('express');
const app = express.Router();
const userController = require('../controller/userController');
const articleController = require('../controller/articleController');
const authorController = require('../controller/authorController');
const authenticationService = require('../services/auth');

app.post('/sign-up', userController.singUp)
app.post('/login', authenticationService.login)

app.get('/users', userController.index)
app.get('/users/:id', userController.getById)
app.put('/users/:id', authenticationService.authorizeAdmin, userController.updateUser)
app.delete('/users/:id', authenticationService.authorizeAdmin, userController.deleteUser)

//Routes authors
app.get('/admin/authors', authenticationService.authorizeAdmin, authorController.index)
app.get('/admin/authors/:id', authenticationService.authorizeAdmin, authorController.getAuthorById)
app.post('/admin/authors', authenticationService.authorizeAdmin, authorController.createAuthor)
app.put('/admin/authors/:id', authenticationService.authorizeAdmin, authorController.updateAuthor)
app.delete('/admin/authors/:id', authenticationService.authorizeAdmin, authorController.deleteAuthor)

// Routes articles
app.get('/articles/:id', authenticationService.authorizeLogin, articleController.getArticleById)
app.post('/admin/articles', authenticationService.authorizeAdmin, articleController.createArticle)
app.put('/admin/articles', authenticationService.authorizeAdmin, articleController.updateArticle)
app.delete('/admin/articles', authenticationService.authorizeAdmin, articleController.deleteArticle)

module.exports = app;