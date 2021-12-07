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

module.exports.update =  async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    Biker.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.idBiker)},
        {
            $set: {
              name:req.body.name,
              password:req.body.password,
              phone:req.body.phone,
              img:req.body.img,
              accepted:req.body.accepted
            },
        },

        { returnOriginal: false }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Biker with id=${req.params.idBiker}. Maybe Biker was not found!`,
                });
            } else res.send({ message: "Dato actualizado exitosamente" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Error updating  Biker with id=" + req.params.idBiker,
            });
        });
};


module.exports.findOneByToken = async (req, res) => {
    //const code = req.params.code;
    const code = req.body.token;

    Biker.findOne({ token: code })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found biker with code " + code,
                });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving biker with code=" + code,
            });
        });
};

module.exports.findAllActiveAndAccepted = async (req, res) => {
    Biker.find({ active: true, accepted: true })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Bikers.",
            });
        });
};
module.exports.findAllActive= async (req, res) => {
    Biker.find({ active: true })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Bikers.",
            });
        });
};