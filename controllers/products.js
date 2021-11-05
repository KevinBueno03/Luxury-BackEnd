var mongoose = require("mongoose");
var Product = mongoose.model("Product");
var Company = mongoose.model("Company");


module.exports.register = (req, res) => {

    var item = new Product();

    if (item) {
        item.name = req.body.name;
        item.description = req.body.description;
        item.price = req.body.price;
        console.log("entra al controllador")
        console.log(item.name);
        console.log(item.description);
        console.log(item.price);
    }

    item.save((err, doc) => {
        let r = {
            _err: false,
            message: undefined,
            items: undefined,
        };

        if (!err) {
            console.log(doc);
            Company.update({
                    _id: mongoose.Types.ObjectId(req.body.idCompany),
                }, {
                    $push: {
                        products: {
                            idProducto: doc._id
                        }
                    }
                }).then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
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