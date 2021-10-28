
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments('id')
        table.string('username').unique().notNullable()
        table.string('password').notNullable()
        table.boolean('admin').defaultTo(false)
      })
};

exports.down = function(knex) {
  
};
