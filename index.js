var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3434;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = require("./routes");

app.use("/api",router);


app.listen(PORT,function(){
    console.log("Magic happens at port "+PORT);
});
