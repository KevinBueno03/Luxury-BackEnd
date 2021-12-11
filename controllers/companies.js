var mongoose = require("mongoose");
var Company = mongoose.model("Company");
var Category= mongoose.model("Category");
var Product= mongoose.model("Product");


module.exports.register = async (req,res) => {

    try {
    var item = new Company();

    if(item){

        item.name=req.body.name;
        item.description=req.body.description;
        item.logo= req.body.logo,
        item.img = req.body.img,
        item.address= req.body.address
        
    }

    const idCategory= req.params.idCategory || req.headers["id-Category"];

    await item.save();

    const category = await Category.findById(idCategory)
    category.companies.push(item);
    await category.save();

    res.status(200).json({success:true,item});


    } catch(err){
        res.status(400).json({success:false,message:err.message});
    }

    
}

module.exports.findOneById = async (req, res) => {
    //const code = req.params.code;
    

    Company.findById(mongoose.Types.ObjectId(req.params.idCompany),{products:0,img:0})
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
module.exports.getProducts = async (req,res) =>{

    Company.aggregate(
        [
            { $match : { _id :mongoose.Types.ObjectId(req.params.idCompany) } },
            {
                $lookup:
                   {
                      from: 'products',
                      localField:'products',
                      foreignField: '_id',
                      as: 'products'
                   }
             },
             {
                $project:
                {
                    _id:1,
                    products:1,
                    name:1
                    
                    
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


//aun pensando si es necesario 
module.exports.getProductsActive = async (req,res) =>{

    Company.aggregate(
        [
            { $match : { _id :mongoose.Types.ObjectId(req.params.idCompany),"products.active":true } },
            {
                $lookup:
                   {
                      from: 'products',
                      localField:'products',
                      foreignField: '_id',
                      as: 'products'
                   }
             },
            {
                $project:
                {
                    _id:1,
                    products:1,
                    "products.$":true
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

module.exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    Company.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.idCompany)},
        {
            $set: {
              name:req.body.name,
              description:req.body.description,
              calification:req.body.calification,
              img:req.body.img,
              logo:req.body.logo,
              address:req.body.address
              
            },
        },

        { returnOriginal: false }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update company with id=${req.params.idCompany}. Maybe Dcompany was not found!`,
                });
            } else res.send({ message: "Dato actualizado exitosamente" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Error updating company with id=" + req.params.idCompany,
            });
        });
};

