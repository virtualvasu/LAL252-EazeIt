const express = require('express');
const app = express();
const userRoute = require('./router/userRoute');

app.use('/api/v1/user', userRoute); 

app.use('/',(req,res)=>{
    res.send('hello')
})

module.exports = app;