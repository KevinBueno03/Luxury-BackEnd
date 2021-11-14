let mongoose = require("mongoose");
let Admin = mongoose.model("Admin");

module.exports.register= (req,res) => {
    var user = new Admin();

    if(user){
        user.email=req.body.email;
        user.password=req.body.password;
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