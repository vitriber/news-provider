const Article = require('../models/Article');

module.exports = {
  async index(req, res, next) {

    if (req.query.category == undefined) {

      try {

        const results = await Article.query().withGraphFetched('author');

        return res.json(results);

      } catch (error) {
        next(error);
      }

    } else {

      try {

        let { category } = req.query;

        category = '%' + category + '%';

        const result = await Article.query().findOne('category', 'LIKE', category).withGraphFetched('author').select('articles.category', 'articles.title', 'articles.summary');

        return res.send(result);

      } catch (error) {
        next(error);
      }

    }
  },

  async getArticleById(req, res, next) {
    
    const { id } = req.params
    
    if (req.user) {

      results = await Article.query().findById(id).withGraphFetched('author').select('articles.category', 'articles.title', 'articles.summary', 'articles.first_paragraph', 'articles.body');

    } else {

      results = await Article.query().findById(id).select('articles.category', 'articles.title', 'articles.summary', 'articles.first_paragraph').withGraphFetched('author');

    }

    return res.send(results);
  },

  async createArticle(req, res, next) {
    try {
      const newArticle = req.body;

      await Article.query().insert(newArticle);

      return res.status(201).send();

    } catch (error) {
      next(error);
    }
  },


  async updateArticle(req, res, next) {
    try {

      let updateArticle = req.body;

      const { id } = req.params

      await Article.query().findById(id).patch(updateArticle);

      updateArticle = await Article.query().findById(id);

      return res.send(updateArticle);

    } catch (error) {
      next(error);
    }
  },

  async deleteArticle(req, res, next) {
    try {

      const { id } = req.params

      await Article.query().deleteById(id);

      return res.send();


    } catch (error) {
      next(error);
    }
  }



}
