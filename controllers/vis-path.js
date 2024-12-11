const VisPathModel = require('../models/vis-path')
exports.getPath = function (req, res, next) { 
    res.json(VisPathModel.getPath(session.userid, session.username))
    
}