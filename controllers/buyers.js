var mongoose = require("mongoose");
var Buyer = mongoose.model("Buyer");

module.exports.register = (req, res) => {

    var item = new Buyer();

    if (item) {
        item.name = req.body.name;
        item.email = req.body.email;
        item.password = req.body.password;
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