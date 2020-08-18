
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      const categoriesSeed = [
        {id: 1, name: 'Test1'},
        {id: 2, name: 'Test2'},
        {id: 3, name: 'Test3'}
      ]
      return knex('categories').insert(categoriesSeed);
    });
};
