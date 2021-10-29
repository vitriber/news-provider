const express = require('express');
const app = express();
const routes = require ('./routes/routes');

app.use(express.json());

app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({error: error.message});
})


app.listen(process.env.PORT || '3333')
