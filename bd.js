/*const mysql=require('mysql');
const util=require('util');

const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'nodemysql'
})

pool.query=util.promisify(pool.query);
console.log("Conexion con base de datos");
module.exports=pool;*/
console.log({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT})
const knex=require('knex')({
    client:"mysql",
    connection:{
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:3306
    },
    pool:{min:0,max:10}
});

module.exports=knex;