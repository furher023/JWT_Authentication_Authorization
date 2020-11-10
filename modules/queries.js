var db = require('../model/dbConnect');

const usersModel = db.model('users');
const tokenModel = db.model('refreshTokens');

function addUser({email,fName,lName,password}){
    var users = new usersModel();
    users.email = email;
    users.fName = fName;
    users.lName = lName;
    users.password = password;
    console.log(users);
    return new Promise((resolve,reject)=>{
        users.save((error)=>{
            if(error){
                reject(error);
            } else {
                resolve('Successful');
            }
        });
    });
} 



function searchUser(parameters,callback){
    usersModel.find(parameters,(err,result)=>{
        if(err) callback(err,result);
        callback(false,result);
    })
}

function addToken(email,token){
    var refreshToken = new tokenModel();
    refreshToken.email = email;
    refreshToken.token = token;
    refreshToken.save();
}

function searchToken(token,callback){
    tokenModel.find({token : token},(err,result)=>{
        if(err) callback(true);
        callback(false,result);
    })
}

function deleteToken(token,callback){
    tokenModel.deleteOne({token: token},(err)=>{
        if(err) callback(err)
        callback(false,'203');
    })
}

module.exports = {
    addUser : addUser,
    searchUser: searchUser,
    addToken : addToken,
    searchToken : searchToken,
    deleteToken: deleteToken
}


        
    