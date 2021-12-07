var mongoose = require('mongoose')
var Order = mongoose.model('Order')

module.exports.register = (req, res) => {
	var order = new Order()

	if (order) {
		order.idBuyer = mongoose.Types.ObjectId(req.params.idBuyer)
		order.buyerName = req.body.buyerName
	}

	order.save((err, doc) => {
		let r = {
			_err: false,
			message: undefined,
			items: undefined,
		}

		if (!err) {
			console.log(doc)
			res.send(doc)
		} else {
			if (err) {
				console.log(err)
				r._err = true
				r.items = err.keyValue
				res.send(err)
			}
		}
	})
}

module.exports.update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update can not be empty!',
		})
	}

	Order.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.params.idOrder) },
		{
			$set: {
				buyername: req.body.buyername,
				idBiker: req.body.idBiker,
				paid: req.body.paid,
				subtotal: req.body.subtotal,
				isv: req.body.isv,
				commission: req.body.commission,
				total: req.body.total,
				addres: req.body.addres,
				phone: req.body.phone,
				amountProducts: req.body.amountProducts,
				taked: req.body.taked,
				nameStatus: req.body.nameStatus,
                location:req.body.location
			},
		},
		{ returnOriginal: false }
	)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update Order with id=${req.params.idOrder}. Maybe Order was not found!`,
				})
			} else res.send({ message: 'Dato actualizado exitosamente' })
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send({
				message: 'Error updating  Order with id=' + req.params.idOrder,
			})
		})
}


module.exports.findAllOrdersBuyer = async (req, res) => {
    Order.find({ idBuyer: req.params.idBuyer,  })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Orders.",
            });
        });
};
module.exports.findAllOrdersBiker = async (req, res) => {
    Order.find({ idBiker: req.params.idBuyer,  })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Orders.",
            });
        });
};

module.exports.addProduct2Order = async (req,res) =>{

    try{
    const idOrder=  mongoose.Types.ObjectId(req.params.idOrder);
    const product2Add= req.body.product;
    console.log("product",product2Add)
    const actualOrder=  await Order.findById(idOrder);

    var productsActualOrder= actualOrder.products;

    var idProduct2Add=product2Add.idProduct;
    
    var isNewProduct=false;
    if(productsActualOrder.length == 0){
        console.log("arreglo vacio")
        
    }else{
        
        var theSame =productsActualOrder.filter(isInProducts);
        function isInProducts(value){
            
            return value.idProduct==idProduct2Add;
            
        }
    }

    console.log("the same",theSame);


    res.status(200).json({success:true});

    } catch(err){
        res.status(400).json({success:false,message:err.message});
    }

};