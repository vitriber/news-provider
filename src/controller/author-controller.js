const Author = require('../models/Author');

module.exports = {
  async index(req, res, next) {
    try {

      const results = await Author.query();
  
      return res.json(results);

    }catch(error){
      next(error);
    }
  },

  async getAuthorById(req, res, next){
    const { id } = req.params;
    const author = await Author.query().findById(id);
    
    return res.json(author); 
  },

  async createAuthor(req, res, next){
    try{
      const newAuthor = req.body;

      await Author.query().insert(newAuthor);

      return res.status(201).send();

    }catch(error){
      next(error);
    }
  },


  async updateAuthor(req, res, next){
    try{

      let updateAuthor = req.body;

      const { id } = req.params

      await Author.query().findById(id).patch(updateAuthor);

      updateAuthor = await Author.query().findById(id);

      return res.send(updateAuthor);
      
    }catch(error){
      next(error);
    }
  },

  async deleteAuthor(req, res, next) {
    try{

      const {id} = req.params

      await Author.query().deleteById(id);

      return res.send();


    }catch(error){
      next(error);
    }
  }

  

}
