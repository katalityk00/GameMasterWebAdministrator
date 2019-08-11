'use strict';

function get(req,res){
    console.log(__dirname,'get');
    res.send('ok');
}
function post(req,res){
    console.log(__dirname,'post');
    res.send('ok');
}


module.exports = {get,post} ;