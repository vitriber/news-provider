
exports.up = function(knex) {
    return knex.schema.createTable('articles', function(table){
        table.increments('id')
        table.string('category').notNullable()
        table.string('title').notNullable()
        table.text('summary')
        table.text('first_paragraph')
        table.text('body').notNullable()
    
        table.integer('author_id').references('authors.id').notNullable().onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  
};
