
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      const categoriesSeed = [
        {id: 1, category_name: 'Test1'},
        {id: 2, category_name: 'Test2'},
        {id: 3, category_name: 'Test3'}
      ]
      return knex('categories').insert(categoriesSeed);
    });
};
