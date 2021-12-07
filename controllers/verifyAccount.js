var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var Buyer = mongoose.model("Buyer");
var Biker = mongoose.model("Biker");

var map = {
    buyer: Buyer,
    biker:Biker

};

function getUser(model, email) {
    return model.findOne({ email: email }).cursor();
}

module.exports.verify = (req, res) => {
    let element = jwt.verify(req.params.token,process.env.SECRET, (err, r) => {
        if (err) {
            res.send(`Invalid token ${req.params.token}`);
            return "none";
        } else {
            return r.email;
        }
    });
    if (req.query.type == "buyer" || req.query.type =="biker") {
        var item = getUser(map[req.query.type], element);
        item.next((err, doc) => {
            if (err) res.send(err);
            if (doc) {
                if (!doc.active) {
                    doc.active = true;
                    doc.save().then((err) => {
                        res.send("Usuario activado. Ya puedes iniciar sesion.");
                    });
                } else {
                    res.send("Usuario ya activo");
                }
            }
        });
    } else {
        res.status(400).send("Invalid parameters");
    }
};
