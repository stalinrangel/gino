const bd=require('./../bd');

const all= () => bd('company')
    .select('id','name','type','info');

const list= (params) => bd('company')
    .where(params)
    .select('id','name');

const create = (obj) => bd('company')
    .insert(obj);

const update = (id,obj) => bd('company')
    .where(id)
    .update(obj);

const eliminate = (id) => bd('company')
    .where(id)
    .delete();

module.exports={all, list, create, update, eliminate};