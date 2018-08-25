var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var brgObject = {
            burger: data
        };
        console.log(brgObject);
        res.render("index", brgObject);
    });
});
router.post("api/burger", function(req, res) {
    burger.insertOne([
        "name", "consumed"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});
router.put("api/burger/:id", function(req, res) {
    var devoured = "id = " + req.params.id;
    burger.updateOne({
        devoured: req.body.devoured
    }, devoured, function(result) {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;