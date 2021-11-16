var mongoose = require("mongoose");
var Company = mongoose.model("Company");
var Category= mongoose.model("Category");


module.exports.register = async (req,res) => {

    try {
    var item = new Company();

    if(item){

        item.name=req.body.name;
        item.description=req.body.description;
        item.calificacion=req.body.calificacion;
        
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

