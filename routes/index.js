var express = require('express');
var router = express.Router();
var authenticate = require('../modules/authenticate');
var queries = require('../modules/queries');
var verifyToken = require('../modules/verifyToken');

router.post('/login',(req,res)=>{
    /*authenticate(req.body,(error,token,refresh)=>{
        if(error) res.sendStatus(error);
        res.json({token: token , refresh: refresh});
    }); */
    authenticate(req.body)
    .then(result =>res.json(result))
    .catch(error => res.send(error));
});

router.post('/users',(req,res)=>{
    //queries.addUser(req.body,(response)=>res.send(response));
    queries.addUser(req.body)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});


router.get('/verify',(req,res)=>{
    if(req.header('Authorization') == undefined) res.sendStatus('403');
    verifyToken(req.header('Authorization'),(err,token,ver)=>{
        if(err) res.sendStatus(err);
        res.json({token: token, version: ver});
    })

});

router.delete('/logout',(req,res)=>{
    if(req.header('Authorization') == undefined) res.sendStatus('403');
    queries.deleteToken(req.header('Authorization').split(' ')[1],(error,result)=>{
        if(error) res.send('cannot log out');
        res.sendStatus(result);
    })  
})


module.exports = router;