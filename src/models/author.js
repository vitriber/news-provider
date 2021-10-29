const { Model } = require('objection');
const db = require('../database/index');

Model.knex(db);


class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required:['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 2, maxLength: 100},
        picture: { type: 'string'}
      }
    }
  }

}
module.exports = Author;
