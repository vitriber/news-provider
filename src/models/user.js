const { Model } = require('objection');
const db = require('../database/index');

Model.knex(db);


class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', maxLength: 100},
        password: { type: 'string', maxLength: 255},
        admin: { type: 'boolean' }
      }
    }
  }


}

module.exports = User;