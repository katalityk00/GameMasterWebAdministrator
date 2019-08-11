function get(req,res){
    res.render(__dirname+'/home.ejs');
}

module.exports = {get}