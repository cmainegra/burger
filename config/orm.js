var connection = require('../config/connection.js');

var orm = {
    selectAll: function (req, res){
        connection.query("SELECT * FROM burgers;", function(err, data){
            if(err) {
                return res.status(500).end();
            }
            res.render("index", {burgers: data});
        })
    },
    insertOne: function(req, res){
        connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result){
            if (err) {
                return res.status(500).end();
            }
            res.json({ id: result.insertId });
            console.log({ id: result.insertId });
        });
    },
    updateOne: function(req, res){
        connection.query("UPDATE burgers SET burger = ? WHERE id = ?", [req.body.burger, req.params.id], function(err, result) {
            if(err) {
                return res.status(500).end();
            }
            res.json(data);
        });
    }
};

module.exports = orm;