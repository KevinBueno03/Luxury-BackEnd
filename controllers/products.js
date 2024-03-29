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

