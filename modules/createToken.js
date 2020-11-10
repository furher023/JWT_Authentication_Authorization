var jwt = require('jsonwebtoken');
var queries = require('./queries');

function createToken(token,callback){
    queries.searchToken(token,(error,result)=>{
        if(error) callback('403');
        if(result[0] == undefined ) callback('403')
        callback(false,jwt.sign({email : result[0].toJSON().email},process.env.ACCESS_TOKEN_SECRET,{expiresIn : '14m'}));
    })
}


module.exports = createToken;