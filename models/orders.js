const bd=require('./../bd');

const all = () => {
    return bd('orders')
      .select('orders.id', 'orders.info', 'orders.company_id', 'orders.user_id', 'orders.estado', 'users.name as user_name', 'company.name as company_name') // Selecciona solo la columna name de la tabla users y company
      .join('users', 'orders.user_id', 'users.id') // Realiza el JOIN entre las tablas orders y users
      .join('company', 'orders.company_id', 'company.id'); // Realiza el JOIN entre las tablas orders y company
  };

const list= (params) => bd('orders')
    .select('orders.id', 'orders.info', 'orders.company_id', 'orders.user_id', 'orders.estado', 'users.name as user_name', 'company.name as company_name')
    .join('users', 'orders.user_id', 'users.id') 
    .join('company', 'orders.company_id', 'company.id')
    .where('id',params.id);;

const create = (obj) => bd('orders')
    .insert(obj);

const update = (id,obj) => bd('orders')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('orders')
    .where(id)
    .delete();

module.exports={all, list, create, update, eliminate};