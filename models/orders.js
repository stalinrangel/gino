const bd=require('./../bd');

const all = () => {
    return bd('orders')
      .select('orders.id', 'orders.info', 'orders.company_id', 'orders.user_id', 'orders.estado', 'users.name as user_name', 'company.name as company_name') // Selecciona solo la columna name de la tabla users y company
      .join('users', 'orders.user_id', 'users.id') // Realiza el JOIN entre las tablas orders y users
      .join('company', 'orders.company_id', 'company.id'); // Realiza el JOIN entre las tablas orders y company
  };

const listPedidos = (params) => bd('orders')
  .where('orders.pedido_id', '=', params.id) // Asegúrate de calificar 'id' con el nombre de la tabla 'orders'
  .select('orders.id', 'orders.info', 'orders.company_id', 'orders.user_id', 'orders.estado', 'users.name as user_name', 'company.name as company_name')
  .join('users', 'orders.user_id', 'users.id') 
  .join('company', 'orders.company_id', 'company.id');

const list = (params) => bd('orders')
  .where('orders.id', '=', params.id) // Asegúrate de calificar 'id' con el nombre de la tabla 'orders'
  .select('orders.id', 'orders.info', 'orders.company_id', 'orders.user_id', 'orders.estado', 'users.name as user_name', 'company.name as company_name')
  .join('users', 'orders.user_id', 'users.id') 
  .join('company', 'orders.company_id', 'company.id');

const create = (obj) => bd('orders')
    .insert(obj)
    .then((result) => {
      return result; // Devuelve el resultado de la inserción
    })
    .catch((error) => {
        throw error; // Maneja cualquier error que pueda ocurrir durante la inserción
    });

const update = (id,obj) => bd('orders')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('orders')
    .where(id)
    .delete();

module.exports={all, list,listPedidos, create, update, eliminate};