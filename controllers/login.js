var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Bikers = mongoose.model("Biker");
var Buyers = mongoose.model("Buyer");
var Admin = mongoose.model("Admin");

var map = {
    bikers:Bikers,
    buyers:Buyers ,
    admin :Admin,
    
};

function getUser(model, e) {
    return model.findOne({ email: e }).cursor();
}

module.exports.login = (req, res) => {
    let email = req.body.email
    let password = req.body.password
        
    if (email && password) {
        if (req.query.type == "bikers" || req.query.type == "buyer" || req.query.type == "admin") {
            var item = getUser(map[req.query.type], email);
            item.next((err, doc) => {
                if (err) res.send(err);
                if (doc) {
                    if (doc.active) {
                        bcrypt.compare(password, doc.password, (err, r) => {
                            if (err) res.send(err);
                            if (r) {
                                res.status(200).send(
                                    JSON.stringify({ token: doc.token })
                                );
                            } else {
                                res.send("Wrong password");
                            }
                        });
                    } else {
                        res.send("Innactive User");
                    }
                } else {
                    res.send("User not found");
                }
            });
        } else {
            res.status(400).send("Invalid parameters");
        }
    } else {
        res.status(400).send("A email and password is needed");
    }
};
