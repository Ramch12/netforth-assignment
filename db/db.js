const mysql2=require('mysql2/promise');
require('dotenv').config({path:"../config/.env"});


// function to connect with database
async function connect()
{
    const server=await mysql2.createConnection({
         host:process.env.host,
         user:process.env.user,
         password:process.env.password,
         database:process.env.database
    });
    return server;
}


exports.connect=connect;

