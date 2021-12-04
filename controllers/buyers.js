var mongoose = require("mongoose");
var Buyer = mongoose.model("Buyer");



module.exports.register = (req,res) => {

    var user = new Buyer();

    if(user){

        user.name=req.body.name;
        user.email=req.body.email;
        user.password=req.body.password;
        console.log("entra al controllador")
        
    }

        user.save((err, doc) => {
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
               
                res.send(err);
            }
        }
    });
    
}


