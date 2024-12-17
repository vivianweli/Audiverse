const fs = require("fs")
const User = require('../models/user')
let users = JSON.parse(fs.readFileSync('./data/user.json'));

exports.addUser = function (req, res, next) {
    session = req.session;
    
    if(User.existsUserid(req.body.userid)){
        if(User.existsUsername(req.body.username))
            //both userid and username are taken
            res.redirect('/');

        else
            //only userid is taken
            res.redirect('/');

    } else if (User.existsUsername(req.body.username)){
        //only username is taken
            res.redirect('/');


    } else {
        users.push({"userid":req.body.userid, "password":req.body.password, "username":req.body.username, "type":"normal"})   
        console.log(users)
        fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 2), () =>{
        console.log(req)
        })
        res.redirect('/');


        
    }
}



