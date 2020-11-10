var jwt = require('jsonwebtoken');
var createToken = require('./createToken');

function verifytoken(auth,callback){
    jwt.verify(auth.split(' ')[2],process.env.ACCESS_TOKEN_SECRET,(error,result)=>{
        console.log(result);
        if(error){
            createToken(auth.split(' ')[1],(err,token)=>{
                if(err) callback(err);
                callback(false,token,'new')
            })
        }
        else{
            callback(false,auth.split(' ')[2],'old');
        }
} );
}

module.exports = verifytoken;
