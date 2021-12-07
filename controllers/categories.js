var mongoose = require("mongoose");
var category = mongoose.model("Category");
var company = mongoose.model("Company");

module.exports.register = (req,res) => {

    var item = new category();

    if(item){

        item.name=req.body.name;
        
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

module.exports.getCategories = async (req,res) => {
    category.find({},{companies:false}).
    then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving doctors.",
        });
    });

}

module.exports.getCompanies = async (req,res) =>{

    category.aggregate(
        [
            { $match : { _id:mongoose.Types.ObjectId(req.params.idCategory)}},
            {
                $lookup:
                   {
                      from:'companies',
                      localField:'companies',
                      foreignField:'_id',
                      as:'companies'
                   }
             }
        ]
    ).then((data) => {
        res.send(data[0]);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving patients.",
        });
    });
    
}

//obtener todas las companias y sus productos por company
module.exports.getCompaniesAndProducts = async (req,res) =>{

    category.aggregate(
        [
            { $match : { _id:mongoose.Types.ObjectId(req.params.idCategory)}},
            {
                $lookup:
                   {
                      from:'companies',
                      localField:'companies',
                      foreignField:'_id',
                      as:'companies'
                   }
             },
             {
                $unwind:'$companies'
             },

            {$lookup:
                {
                    from:'products',
                    localField:'companies.products',
                    foreignField:'_id',
                    as:'companies.products' 
                }
            }
             
             

            
        ]
    ).then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message ||
                "Some error occurred while retrieving patients.",
        });
    });
    
}

module.exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    category.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.idCategory)},
        {
            $set: {
              name:req.body.name,
              img:req.body.img,
            },
        },

        { returnOriginal: false }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Category with id=${req.params.idCategory}. Maybe Category was not found!`,
                });
            } else res.send({ message: "Dato actualizado exitosamente" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Category with id=" + req.params.idCategory,
            });
        });
};

