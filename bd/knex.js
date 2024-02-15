var enviroment=process.env.NODE_ENV || 'development';
console.log(enviroment)
var config= require('../knexfile.js')(enviroment);
console.log(config)
module.exports=require('knex')(config);