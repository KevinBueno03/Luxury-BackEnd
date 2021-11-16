var mongoose = require("mongoose");
var category = mongoose.model("Category");


module.exports.register = (req,res) => {

    var item = new category();

    if(item){

        item.name=req.body.name;
        
    }

        item.save((err, doc) => {
        let r = {
            _err: false,
            message: undefined,
            items: undefined,
        };

        if (!err) {
            console.log(doc);
            res.send(doc);
        } else {
            if (err) {
                console.log(err);
                r._err = true;
                r.items = err.keyValue;
                res.send(err);
            }
        }
    });
    
}


