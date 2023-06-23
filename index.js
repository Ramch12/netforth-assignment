const express = require('express');
const app=express();
require('dotenv').config({path:"./config/.env"});
const router=require('./router/route');
const error=require('./middleware/error');

const PORT=process.env.PORT;

app.use(express.json());


app.use('/',router);
app.use(error);




app.listen(PORT,()=>{
    console.log(`Your application is running on PORT ${PORT}`)
})