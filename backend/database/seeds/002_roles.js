
exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      const rolesSeed = [
        {id: 1, name: 'user'},
        {id: 2, name: 'staff'},
        {id: 3, name: 'admin'}
      ]
      return knex('roles').insert(rolesSeed);
    });
};
