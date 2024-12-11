const fs = require("fs")
const User = require('../models/user')
let users = JSON.parse(fs.readFileSync('./data/user.json'));

exports.addUser = function (req, res, next) {
    session = req.session;

    if(User.existsUserid(req.body.userid)){
        if(User.existsUsername(req.body.username))
            //both userid and username are taken
            res.render("index.ejs", { 'userid': session.userid, error: false, errorType: 1, currentRoute: '/'})

        else
            //only userid is taken
            res.render("index.ejs", { 'userid': session.userid, error: false, errorType: 2, currentRoute: '/'})
    } else if (User.existsUsername(req.body.username)){
        //only username is taken
        res.render("index.ejs", { 'userid': session.userid, error: false, errorType: 3, currentRoute: '/'})

    } else {
        users.push({"userid":req.body.userid, "password":req.body.password, "username":req.body.username, "type":"normal"})   
        console.log(users)
        fs.writeFile('./data/user.json', JSON.stringify(users, null, 2), () =>{
        console.log(req)
        })
        res.render("index.ejs", { 'userid': session.userid, error: false, errorType: 0, currentRoute: '/'})

        
    }
}



