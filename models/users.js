const bd=require('./../bd');

const all= () => bd('users')
    .select('id','name','email','created_at');

const list= (params) => bd('users')
    .where(params)
    .select('id','name','email','created_at');

const create = (obj) => bd('users')
    .insert(obj);

const update = (id,obj) => bd('users')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('users')
    .where(id)
    .delete();

const orders = (pedidoId) => {
    console.log(pedidoId.id)
    return bd('orders')
      .select('orders.id', 'orders.info', 'orders.company_id', 'orders.user_id', 'orders.estado', 'users.name as user_name', 'company.name as company_name') // Selecciona solo la columna name de la tabla users y company
      .join('users', 'orders.user_id', 'users.id') // Realiza el JOIN entre las tablas orders y users
      .join('company', 'orders.company_id', 'company.id')// Realiza el JOIN entre las tablas orders y company
      .where('user_id',pedidoId.id);
    };

const pedidos = (pedidoId) => {
    console.log(pedidoId.id)
    return bd('pedidos')
        .select('pedidos.id', 'pedidos.info', 'pedidos.company_id', 'pedidos.user_id', 'pedidos.estado', 'users.name as user_name', 'company.name as company_name') // Selecciona solo la columna name de la tabla users y company
        .join('users', 'pedidos.user_id', 'users.id') // Realiza el JOIN entre las tablas orders y users
        .join('company', 'pedidos.company_id', 'company.id')// Realiza el JOIN entre las tablas orders y company
        .where('user_id',pedidoId.id);
    };

module.exports={all, list, create, update, eliminate,orders,pedidos};