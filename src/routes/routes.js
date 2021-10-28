import {Router} from Express;
const app = Router();
const UserController = require('./controllers/UserController');
const ArticleController = require('./controllers/ArticleController');
const AuthorController = require('./controllers/AuthorController');
const AuthenticationService = require('./services/auth')

app.post('/sign-up', UserController.singUp)
app.post('/login', AuthenticationService.login)

app.get('/users', UserController.index)
app.get('/users/:id', UserController.getById)
app.put('/users/:id', AuthenticationService.authorizeAdmin, UserController.updateUser)
app.delete('/users/:id', AuthenticationService.authorizeAdmin, UserController.deleteUser)

//Routes authors
app.get('/admin/authors', AuthenticationService.authorizeAdmin, AuthorController.index)
app.get('/admin/authors/:id', AuthenticationService.authorizeAdmin, AuthorController.getAuthorById)
app.post('/admin/authors', AuthenticationService.authorizeAdmin, AuthorController.createAuthor)
app.put('/admin/authors/:id', AuthenticationService.authorizeAdmin, AuthorController.updateAuthor)
app.delete('/admin/authors/:id', AuthenticationService.authorizeAdmin, AuthorController.deleteAuthor)

// Routes articles
app.get('/articles/:id', AuthenticationService.authorizeLogin, ArticleController.getArticleById)
app.post('/admin/articles', AuthenticationService.authorizeAdmin, ArticleController.createArticle)
app.put('/admin/articles', AuthenticationService.authorizeAdmin, ArticleController.updateArticle)
app.delete('/admin/articles', AuthenticationService.authorizeAdmin, ArticleController.deleteArticle)

export default app;