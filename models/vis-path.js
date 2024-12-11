/* This code just reads the json file of the username passed as argument and returns its content. 
It also gets the username of the user that is linked to the file that contains this data. 
You can also see that it checks if the user given as parameter exists.
*/

const User = require('./user')

module.exports = class VisPath {
    static getPath = function(userid) {
        if(User.existsUserid(userid)){
            const username = User.getName(userid)
            return require('../data/' + username + "-path.json") 
        } else {
            return {"path": []} 
        }
    }
}