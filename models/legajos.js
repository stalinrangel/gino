const bd=require('./../bd');

const all= () => bd('legajos')
    .select('legajos.id','legajos.info','legajos.company_id','legajos.role_id','legajos.user_id','users.name as user_name','company.name as company_name','roles.name as roles_name')
    .join('company', 'legajos.company_id', 'company.id')
    .join('roles', 'legajos.role_id', 'roles.id')
    .join('users', 'legajos.user_id', 'users.id');


const list= (params) => bd('legajos')
    .where(params)
    .select('id','info','company_id','role_id','user_id');

const create = (obj) => bd('legajos')
    .insert(obj);

const update = (id,obj) => bd('legajos')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('legajos')
    .where(id)
    .delete();

module.exports={all, list, create, update, eliminate};