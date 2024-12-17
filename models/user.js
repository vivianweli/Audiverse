/* This code simulates a database with the list of users. 
It also creates a class User that has a function to verify a user connection. 
In the real world, this list should be a real database and this verification a query to a database.
*/
const fs = require("fs")

module.exports = class User {
    // Helper method to reload users
    static loadUsers = function () {
        let users = JSON.parse(fs.readFileSync('./data/user.json'));
        return users;
    }
    static verify = function (userid, password) {
        let users = this.loadUsers();
        var flag = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].userid == userid && users[i].password == password) {
                flag = true  
                return flag    
            }
        }

    }
    static getName = function (userid) {
        let users = this.loadUsers();
        var result = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].userid == userid) {
                result = users[i].username
                return result
            }
          
        }
    }
    static getType = function (userid) {
        let users = this.loadUsers();
        var result = undefined;
        for (let i = 0; i < users.length; i++) {
            if (users[i].userid == userid) {
                result = users[i].type
                return result
            }
            
        }
        
    }
    static existsUserid = function (userid) {
        let users = this.loadUsers();
        var flag = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].userid == userid) {
                flag = true  
                return flag    
            }
        }

        
    }

    static existsUsername = function (username) {
        let users = this.loadUsers();
        var flag = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                flag = true  
                return flag    
            }
        }

        
    }

}