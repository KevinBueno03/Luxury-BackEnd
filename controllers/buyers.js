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

module.exports.update =  async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    Buyer.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.idBuyer)},
        {
            $set: {
              name:req.body.name,
              password:req.body.password,
              img:req.body.img,
            },
        },

        { returnOriginal: false }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Buyer with id=${req.params.idBuyer}. Maybe Buyer was not found!`,
                });
            } else res.send({ message: "Dato actualizado exitosamente" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Error updating  Buyer with id=" + req.params.idBuyer,
            });
        });
};


module.exports.findOneByToken = async (req, res) => {
    //const code = req.params.code;
    var code = req.body.token;

    Buyer.findOne({token:req.params.token})
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found Buyer with code " + code,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Buyer with code=" + code,
            });
        });
};

