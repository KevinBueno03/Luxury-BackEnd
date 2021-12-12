var mongoose = require("mongoose");
var Product = mongoose.model("Product");
var Company = mongoose.model("Company");

module.exports.register = async (req,res) => {

    try {
    var item = new Product();

    if(item){

        item.name=req.body.name;
        item.description = req.body.description;
        item.price= req.body.price;
        item.img=req.body.img
       
        
    }

    const idCompany= req.params.idCompany || req.headers["id-Company"];

    await item.save();

    const company = await Company.findById(idCompany)
    company.products.push(item);
    await company.save();

    res.status(200).json({success:true,item});


    } catch(err){
        res.status(400).json({success:false,message:err.message});
    }

    
}

module.exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    Product.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.idProduct)},
        {
            $set: {
              name:req.body.name,
              description:req.body.description,
              price:req.body.price,
              img:req.body.img,
              active:req.body.active
              
            },
        },

        { returnOriginal: false }
    )
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update product with id=${req.params.idProduct}. Maybe product was not found!`,
                });
            } else res.send({ message: "Dato actualizado exitosamente" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Error updating  product with id=" + req.params.idProduct,
            });
        });
};

module.exports.delete = async (req,res) => {

    try {
    
    const idCompany= req.params.idCompany || req.headers["id-Company"];

    await Product.findOneAndRemove({_id:req.params.idProduct});

    const company = await Company.findById(idCompany);
    company.products.pull(req.params.idProduct);
    await company.save();

    res.status(200).json({success:true,idCompany});

    } catch(err){
        res.status(400).json({success:false,message:err.message});
    }    
}

