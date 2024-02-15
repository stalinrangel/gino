/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, name: 'ADMIN',type: 'ADMIN'},
    {id: 2, name: 'GERENTE',type: 'GERENTE'},
    {id: 3, name: 'ENCARGADO MANTENIMIENTO',type: 'ENCARGADO'},
    {id: 4, name: 'OPERARIO',type: 'OPERARIO'},
    {id: 5, name: 'MANTENIMIENTO',type: 'MANTENIMIENTO'}
  ]);
};
