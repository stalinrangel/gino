const bd=require('./../bd');

const all= () => bd('roles')
    .select('id','name');

const list= (params) => bd('roles')
    .where(params)
    .select('id','name');

const create = (obj) => bd('roles')
    .insert(obj);

const update = (id,obj) => bd('roles')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('roles')
    .where(id)
    .delete();

module.exports={all, list, create, update, eliminate};