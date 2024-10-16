import mongoose from "mongoose";

const printschema = mongoose.Schema({
	
		username : {
			type : String,
		},

		paymentAmount : {
			type : Number,
			required: true
		},

		uniquecoupen : {  // its a simple memorable number
			type : Number,
			unique : true,
			required: true
		},

		orderId : {   // its a complex form of string mix of number and characters
			type : String,
			unique : true,
			required : true
		},

		fileinfo : {
			type : String,
			required : true
		},

		pages : {
			type : String,
			default : "all"
		},

		Layout : {
			type : String,
			default : "Portrait"
		},

		printType : {
			type : String,
			default : "singlesided"
		},

		verifypayment : {
			type : Boolean,
			default : false
		},

		printStatus : {
		type : String,
		default : "pending"
	   }

	
} , {timestamps: true})

export const Print = mongoose.model("print" , printschema);
