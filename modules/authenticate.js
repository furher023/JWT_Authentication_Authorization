var jwt = require('jsonwebtoken');
var queries = require('./queries');

/* function authenticate({email,password},callback){
    queries.searchUser({'email': email },(error,result)=>{
        if(error) callback('403');
       // console.log(result[0].password);
        if(result[0].password == password){
            //console.log('here');
            let token = jwt.sign({email : email},process.env.ACCESS_TOKEN_SECRET,{expiresIn : '14m'});
            let refreshToken = jwt.sign({email: email},process.env.REFRESH_TOKEN_SECRET);
            queries.addToken(email,refreshToken);
            callback(false,token,refreshToken);
        }
        else    
           callback(true,'403'); 
    });
} */

function authenticate({email,password}){
    return new Promise((resolve,reject)=>{
        queries.searchUser({'email': email },(error,result)=>{
            if(error) reject('403');
           // console.log(result[0].password);
            if(result[0].password == password){
                //console.log('here');
                let token = jwt.sign({email : email},process.env.ACCESS_TOKEN_SECRET,{expiresIn : '14m'});
                let refreshToken = jwt.sign({email: email},process.env.REFRESH_TOKEN_SECRET);
                queries.addToken(email,refreshToken);
                
                resolve({token: token, refresh: refreshToken});
            }
            else    
               reject(true,'403'); 
        });
    })
}

module.exports = authenticate;