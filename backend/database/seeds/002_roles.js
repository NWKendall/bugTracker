
exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      const rolesSeed = [
        {id: 1, role_name: 'user'},
        {id: 2, role_name: 'staff'},
        {id: 3, role_name: 'admin'}
      ]
      return knex('roles').insert(rolesSeed);
    });
};
