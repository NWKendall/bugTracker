
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').delete()
    .then(function () {
      // Inserts seed entries
      const categoriesSeed = [
        {id: 1, category: 'Test1'},
        {id: 2, category: 'Test2'},
        {id: 3, category: 'Test3'}
      ]
      return knex('categories').insert(categoriesSeed);
    });
};
