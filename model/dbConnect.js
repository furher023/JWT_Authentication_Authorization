const mongoose = require('mongoose');

//Connecting to the database
const options= {   useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false // creating error 11000 without it
  };
mongoose.connect('mongodb://localhost:27017/test',options,(error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Successfully connected to database");
    }
});

const Schema = mongoose.Schema;

const users = new Schema({
    email:{
        type: String
    },
    fName:{
        type:String
    },
    lName:{
        type:String
    },
    password: {
        type: String
    }
});


const refreshTokens = new Schema({
    email:{
        type: String
    },
    token:{
        type: String
    }
});


mongoose.model('users',users);
mongoose.model('refreshTokens',refreshTokens);

module.exports = mongoose;
