
exports.seed = function(knex) {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash('123456', salt)

  await knex('users').del()
    .then(() => {
      return knex('users').insert([
        {username: 'admin', password: encryptedPassword, admin: 'true'},
        {username: 'ana', password: encryptedPassword, admin: 'true'},
        {username: 'someone', password: encryptedPassword},
      ]);
    });
};
