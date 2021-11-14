let mongoose = require("mongoose");
let Biker = mongoose.model("Biker");

module.exports.register = (req,res) =>{

    var user= new Biker();

    if(user){
        user.name=req.body.name;
        user.email=req.body.email;
        user.password=req.body.password;
        user.hn_id=req.body.hn_id;
        user.phone_number=req.body.phone_number;
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
                r._err = true;
                r.items = err.keyValue;
                res.send(err);
            }
        }
    });
}