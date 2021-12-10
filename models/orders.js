let mongoose = require('mongoose')
let validator = require('validator')
var orderSchema = new mongoose.Schema({
	idBuyer: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	idBiker: {
		type: mongoose.Types.ObjectId,
		
	},
	products: {
		type: [mongoose.Schema.Types.Mixed],
	},
	paid: {
		type: Boolean,
		default: false,
	},
	subtotal: {
		type: Number,
		default: 0,
	},
	isv: {
		type: Number,
		default: 0,
	},
	commission: {
		type: Number,
		default: 65,
	},
	commissionAdmin: {
		type: Number,
		default: 15,
	},
	commissionBiker: {
		type: Number,
		default: 45,
	},
	total: {
		type: Number,
		default: 0,
	},
	address: {
		type: String,
	},
	phone: {
		type: String,
		
		validate: {
			validator: function (value) {
				return value.length == 8
			},
			message: 'Se requiere de 8 digitos',
		},
	},
	amountProducts: {
		type: Number,
		default: 0,
	},
	taked: {
		type: Boolean,
		default: false,
	},
	nameStatus: {
		type: String,
	},
	buyerName: {
		type: String,
	},
    location:{
        type:mongoose.Schema.Types.Mixed
    },
	
})
module.exports = mongoose.model('Order', orderSchema)
