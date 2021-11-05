var mongoose = require("mongoose");
var Company = mongoose.model("Company");


module.exports.register = (req, res) => {

    var item = new Company();

    if (item) {
        item.name = req.body.name;
        item.description = req.body.description;
        item.calification = 0.0;
        item.products = [];
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

module.exports.addProduct = (req, res) => {

    var item = new Company();

    item.update({
            _id: mongoose.Types.ObjectId(req.params.id),
        }, {
            $push: {
                products: {
                    idProducto: req.params.idProducto
                }
            }
        }).then(result => {
            res.send({ codigo: 1, mensaje: 'Se agrego un nuevo registro a bitacoraUsuarios' })
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });


    /* item.update((err, doc) => {
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
    }); */
}