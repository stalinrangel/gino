const bd=require('./../bd');

const all = () => {
    return bd('pedidos')
      .select('pedidos.id', 'pedidos.info', 'pedidos.company_id', 'pedidos.user_id', 'pedidos.estado', 'users.name as user_name', 'company.name as company_name') // Selecciona solo la columna name de la tabla users y company
      .join('users', 'pedidos.user_id', 'users.id') // Realiza el JOIN entre las tablas orders y users
      .join('company', 'pedidos.company_id', 'company.id'); // Realiza el JOIN entre las tablas orders y company
  };

const list= (params) => bd('pedidos')
    .where('pedidos.id', '=', params.id) // Asegúrate de calificar 'id' con el nombre de la tabla 'orders'
    .select('pedidos.id', 'pedidos.info', 'pedidos.company_id', 'pedidos.user_id', 'pedidos.estado', 'users.name as user_name', 'company.name as company_name')
    .join('users', 'pedidos.user_id', 'users.id') 
    .join('company', 'pedidos.company_id', 'company.id');

const create = (obj) => bd('pedidos')
    .insert(obj).then((result) => {
        return result; // Devuelve el resultado de la inserción
    })
    .catch((error) => {
        throw error; // Maneja cualquier error que pueda ocurrir durante la inserción
    });

const update = (id,obj) => bd('pedidos')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('pedidos')
    .where(id)
    .delete();

module.exports={all, list, create, update, eliminate};