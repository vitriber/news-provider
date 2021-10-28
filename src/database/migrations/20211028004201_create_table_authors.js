
exports.up = function(knex) {
    return knex.schema.createTable('authors', function(table){
        table.increments('id')
        table.string('name').unique().notNullable()
        table.string('picture')
    })
};

exports.down = function(knex) {
  
};
