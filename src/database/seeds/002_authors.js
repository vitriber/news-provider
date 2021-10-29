
exports.seed = function(knex) {
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {name: 'John Doe', 'picture': 'https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png'},

        {name: 'Jane Dawn', 'picture': 'https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png'},
        
        {name: 'Ben Garret', 'picture': 'https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png'},
        
      ]);
    });
};
