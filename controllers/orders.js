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
	Order.find({ idBiker: req.params.idBuyer })
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
		const product2Add = req.body.product
		const actualOrder = await Order.findById(idOrder)
		var productsActualOrder = actualOrder.products
		var idProduct2Add = product2Add.idProduct
		if (productsActualOrder.length == 0) {
			console.log('arreglo vacio')
			console.log('product', product2Add)
			productsActualOrder.push(product2Add)
			actualOrder.save()
		} else {
			var theSame = productsActualOrder.filter(isInProducts)
			function isInProducts(value) {
				return value.idProduct == idProduct2Add
			};

			if (theSame.length > 0) {
				const newAmount= theSame[0].amount + 1;

				await Order.findOneAndUpdate(
						{ _id:idOrder
						,"products.idProduct":theSame[0].idProduct},
						{
							$set: {
							"products.$.amount":newAmount
	
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

				if(newAmount>0){

					await Order.findOneAndUpdate(
							{ _id:idOrder
							,"products.idProduct":theSame[0].idProduct},
							{
								$set: {
								"products.$.amount":newAmount
		
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
	try {
		const idOrder = mongoose.Types.ObjectId(req.params.idOrder)
		const product2Add = req.body.product
		const actualOrder = await Order.findById(idOrder)
		var productsActualOrder = actualOrder.products
		var idProduct2Add = product2Add.idProduct
		if (productsActualOrder.length >0 ) {
			
			console.log('product', product2Add)
			productsActualOrder.splice(product2Add)
			actualOrder.save()
		} 

		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err.message })
	}
}



module.exports