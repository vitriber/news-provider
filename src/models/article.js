const { Model } = require('objection');
const db = require('../database/index');

Model.knex(db);

class Article extends Model {
  static get tableName() {
    return 'articles';
  }

  static get relationMappings() {
    const Author = require('./Author');
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'articles.author_id',
          to: 'authors.id',
        }
      }
    }
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['category', 'title', 'body', 'author_id'],
      properties: {
        id: { type: 'integer' },
        category: { type: 'string', minLength: 1, maxLength: 255},
        title: { type: 'string', minLength: 1, maxLength: 255},
        summary: { type: 'string', maxLength: 300},
        first_paragraph: { type: 'string', maxLength: 1000},
        body: { type: 'string' },
        author_id: { type: 'integer' }
      }
    }
  }

}

module.exports = Article;
