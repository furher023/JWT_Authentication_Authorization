require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

const PORT = process.env.PORT || '3001';

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

//Enabling cross origin sharing
app.use(cors());

//Routing
var indexRouter = require('./routes/index');
app.use('/',indexRouter);




app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Server started successfully')
    }
});


module.exports = app;
