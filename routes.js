var router = require("express").Router();
var Obj = require("./obj");

//All the routes go here
router.get("/",function(req,res){
    res.json({message: "This works like a charm."});
});

router.route("/object").post(function(req,res){

        if(Object.keys(req.body).length !== 0){

            req.body.ts = new Date().getTime();
            var obj = new Obj(req.body);

            obj.save(function(err){
                if(err)
                    return res.status(400).json({error: err});

                res.json({message: "Data save success."});
            });
        }
        else
            res.status(400).json({error: "key value pair is required."})
    })
    .get(function(req,res){
        Obj.find({},"-_id -__v",function(err,objs){
            if(err)
                return res.send(err);
            res.json(objs);
        })
    });

router.route("/object/:key").get(function(req,res){

    var filter = {};
    filter[req.params.key] = {'$exists': true};


    if(req.query.timestamp){
        filter.ts = req.query.timestamp;
        return Obj.findOne(filter,req.params.key+" -_id",function(err,obj){
            if(err)
                return res.send(err);

            if(obj === null) return res.send(null);

            res.send(JSON.parse(JSON.stringify(obj))[req.params.key]);
        })
    }


    Obj.findOne(filter,req.params.key+" -_id",{sort: {"ts": -1}},function(err,obj){
        if(err)
            return res.send(err);

        if(obj === null) return res.send(null);

        res.send(JSON.parse(JSON.stringify(obj))[req.params.key]);
    })
});

module.exports = router;