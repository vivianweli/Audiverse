const fs = require("fs")
const User = require('../models/user')
let users = JSON.parse(fs.readFileSync('./data/user.json'));

exports.addUser = function (req, res, next) {
    session = req.session;
    
    if(User.existsUserid(req.body.userid)){
        if(User.existsUsername(req.body.username)){
            //both userid and username are taken
            req.session.signup_error = 1;
            req.session.login_error = false;
            res.redirect('/');
        }
            

        else{
            req.session.signup_error = 2;
            req.session.login_error = false;

            //only userid is taken
            res.redirect('/');

        }
            

    } else if (User.existsUsername(req.body.username)){
        req.session.signup_error = 3;
        req.session.login_error = false;


        //only username is taken
            res.redirect('/');


    } else {
        req.session.signup_error = 0;
        req.session.login_error = false;

        users.push({"userid":req.body.userid, "password":req.body.password, "username":req.body.username})   
        console.log(users)
        fs.writeFileSync('./data/user.json', JSON.stringify(users, null, 2), () =>{
        console.log(req)
        })
        res.redirect('/');


        
    }
}



