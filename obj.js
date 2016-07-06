var mongoose = require("mongoose");

mongoose.connect("mongodb://essa:pakistan@ds015335.mlab.com:15335/my_db");

//mongoose.connect("mongodb://localhost:27017");

var Schema = mongoose.Schema;

var obj_schema = new Schema({
    key: String,
    ts: String
},{strict: false});

module.exports = mongoose.model("obj",obj_schema);