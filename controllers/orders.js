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

module.exports.getAllOrder= async (req,res) => {
    Order.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Order.",
            });
        });
};
module.exports.getAllOrdersPaid= async (req,res) => {
    Order.find({paid:true})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Order.",
            });
        });
};

module.exports.getOrdersNotPaid= async (req,res) => {
    Order.find({paid:false})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Order.",
            });
        });
};
module.exports.getOrderById= async (req, res) => {
    Order.find({_id:mongoose.Types.ObjectId(req.params.idOrder)})
        .then((data) => {
            res.send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Order.",
            });
        });
};

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
				address: req.body.address,
				phone: req.body.phone,
				amountProducts: req.body.amountProducts,
				taked: req.body.taked,
				nameStatus: req.body.nameStatus,
				location: req.body.location,
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

//buyer things
module.exports.getOrderNotPaidBuyer= async (req,res) => {
    Order.findOne({ idBuyer: req.params.idBuyer,paid:false})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Order.",
            });
        });
};
module.exports.getOrdersPaidBuyer= async (req,res) => {
    Order.find({ idBuyer: req.params.idBuyer,paid:true})
        .then((data) => {
            res.send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Order.",
            });
        });
};
//
module.exports.findAllOrdersBuyer = async (req, res) => {
	Order.find({ idBuyer: req.params.idBuyer })
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Orders.',
			})
		})
}

module.exports.findAllOrdersBiker = async (req, res) => {
	Order.find({ idBiker: req.params.idBiker })
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Orders.',
			})
		})
}

module.exports.addProduct2Order = async (req, res) => {
	try {
		const idOrder = mongoose.Types.ObjectId(req.params.idOrder)
		const product2Add = req.body.product;
		var actualOrder = await Order.findById(idOrder)
		var productsActualOrder = actualOrder.products
		var idProduct2Add = product2Add.idProduct
		if (productsActualOrder.length == 0) {
			console.log('arreglo vacio')
			console.log('product', product2Add)
			productsActualOrder.push(product2Add);
			await actualOrder.save();
			 //actualOrder = await Order.findById(idOrder);
			//ac=actualOrder


			var acSubtotal=product2Add.price*product2Add.amount;
			var acisv=acSubtotal*.15;
			var actotal=acSubtotal+actualOrder.commission+acisv;
			var newAmountProductsOrder=actualOrder.amountProducts +1;
			console.log(acSubtotal,acisv,actotal);

			await Order.findOneAndUpdate(
				{ _id:idOrder
				},
				{
					$set: {
					subtotal:acSubtotal,
					isv:acisv,
					total:actotal,
					amountProducts:newAmountProductsOrder,
					
					
					},
				},

				{ returnOriginal: false }
				)
				.then((data) => {
					if (!data) {
						res.status(404).send({
							message: `Cannot update product with id=${theSame[0].idProduct}. Maybe product was not found!`,
						});
					} else {
						res.send({ product:data.products,message: "Dato actualizado exitosamente" })};
				})
				.catch((err) => {
					console.log(err);
					res.status(500).send({
						message: "Error updating  product with id=" + req.params.idProduct,
					});
				});

			
		} else {
			var theSame = productsActualOrder.filter(isInProducts)
			function isInProducts(value) {
				return value.idProduct == idProduct2Add
			};

			if (theSame.length > 0) {

				const newAmount= theSame[0].amount + 1;
				const newTotalPrice = theSame[0].totalPrice + (product2Add.price*product2Add.amount);
				var amount2Add = product2Add.price*product2Add.amount;
				var acSubtotal= actualOrder.subtotal +amount2Add;
				var acisv=acSubtotal*.15;
				var actotal=acSubtotal+actualOrder.commission+acisv;
				var newAmountProductsOrder=actualOrder.amountProducts +1;

				await Order.findOneAndUpdate(
						{ _id:idOrder
						,"products.idProduct":theSame[0].idProduct},
						{
							$set: {
							"products.$.amount":newAmount,
							"products.$.totalPrice":newTotalPrice,
							subtotal:acSubtotal,
							isv:acisv,
							total:actotal,
							amountProducts:newAmountProductsOrder
							},
						},

						{ returnOriginal: false }
						)
						.then((data) => {
							if (!data) {
								res.status(404).send({
									message: `Cannot update product with id=${theSame[0].idProduct}. Maybe product was not found!`,
								});
							} else {

								res.send({ product:data.products,message: "Dato actualizado exitosamente" })};
						})
						.catch((err) => {
							console.log(err);
							res.status(500).send({
								message: "Error updating  product with id=" + req.params.idProduct,
							});
						});

				
				console.log('the same', theSame)
				theSame[0].amount = theSame[0].amount + 1
				console.log('the same', theSame)
			}else{
				productsActualOrder.push(product2Add);
				actualOrder.save();
			}
		}

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}

module.exports.subtractProduct2Order = async (req, res) => {
	try {
		const idOrder = mongoose.Types.ObjectId(req.params.idOrder)
		const product2Add = req.body.product
		const actualOrder = await Order.findById(idOrder)
		var productsActualOrder = actualOrder.products
		var idProduct2Add = product2Add.idProduct

		if (productsActualOrder.length == 0) {
			console.log("no way");
		} else {
			var theSame = productsActualOrder.filter(isInProducts)
			function isInProducts(value) {
				return value.idProduct == idProduct2Add
			};

			if (theSame.length > 0) {
				const newAmount= theSame[0].amount - 1;
				const newTotalPrice = theSame[0].totalPrice - (product2Add.price*product2Add.amount);
				var amount2Add =product2Add.price*product2Add.amount;
				var acSubtotal= actualOrder.subtotal -amount2Add;
				var acisv=acSubtotal*.15;
				var actotal=acSubtotal+actualOrder.commission+acisv;
				var newAmountProductsOrder=actualOrder.amountProducts -1;

				if(newAmount>0){

					await Order.findOneAndUpdate(
							{ _id:idOrder
							,"products.idProduct":theSame[0].idProduct},
							{
								$set: {
								"products.$.amount":newAmount,
								"products.$.totalPrice":newTotalPrice,
								subtotal:acSubtotal,
								isv:acisv,
								total:actotal,
								amountProducts:newAmountProductsOrder
		
								},
							},
	
							{ returnOriginal: false }
							)
							.then((data) => {
								if (!data) {
									res.status(404).send({
										message: `Cannot update product with id=${theSame[0].idProduct}. Maybe product was not found!`,
									});
								} else {
									
									res.send({ product:data.products,message: "Dato actualizado exitosamente" })};
							})
							.catch((err) => {
								console.log(err);
								res.status(500).send({
									message: "Error updating  product with id=" + req.params.idProduct,
								});
							});
				}

				console.log('the same', theSame)
				theSame[0].amount = theSame[0].amount - 1
				console.log('the same', theSame)
			}else{
				console.log("no way");
			}
		}

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}
module.exports.removeProduct2Order = async (req, res) => {

	const idOrder = mongoose.Types.ObjectId(req.params.idOrder)

	const actualProductOrder = await Order.findOne({
		_id:idOrder,
		"products.idProduct":req.body.product.idProduct
		
	});
	var product =actualProductOrder.products[0];
	//console.log(actualProductOrder)

	///
	var amount2remove =product.price*product.amount;
	var acSubtotal= actualProductOrder.subtotal -amount2remove;
	var acisv=acSubtotal*.15;
	var actotal=acSubtotal+actualProductOrder.commission+acisv;
	var newAmountProductsOrder=actualProductOrder.amountProducts -product.amount;

	console.log("amount2Add",amount2remove,"newAmountpro",newAmountProductsOrder);

	await Order.updateOne(
		{
			_id: mongoose.Types.ObjectId(req.params.idOrder),
		},
		
		{
			$pull: {
				products:{idProduct: req.body.product.idProduct}
			},
			
		},	
		

	)
	.then((result) => {
		res.send(result);
		res.end();
	})
	.catch((error) => {
		res.send(error);
		res.end();
	});

	await Order.updateOne(
		{
			_id: mongoose.Types.ObjectId(req.params.idOrder),
		},
		
		
		{
			$set: {
				subtotal:acSubtotal,
				isv:acisv,
				total:actotal,
				amountProducts:newAmountProductsOrder
			},
		}

	)
	.then((result) => {
		res.send(result);
		res.end();
	})
	.catch((error) => {
		res.send(error);
		res.end();
	});
}




module.exports