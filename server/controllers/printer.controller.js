import { Print } from "../model/printrequest.models.js";

export const getallprintdata = async(req , res)=>{
	try {
		const prints = await Print.find();
		res.status(200).json({message : "all prints found" , printfiles : prints});
	} catch (error) {
		throw error; // for developement pupose remove in production
		res.status(400).json({ message: "failed to fetch" });
	}
}

export const updatePrintStatus = async(req , res)=>{
	try {
		const {printStatus , orderId} = req.body;
		const print = await Print.findOne({ orderId: orderId });

        if (!print) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the printStatus field
        print.printStatus = printStatus;

        // Save the updated document
        await print.save();

		res.status(200).json({
            message: `Print status updated to ${printStatus}`,
            updatedPrint: print
        });



	} catch (error) {
		throw error;
		res.status(500).json({ message: "Failed to update print status" });
	}
}

export const uploadprint = async(req ,res)=>{
	try {
		const {amount , uniquecoupen , orderId , fileinfo } = req.body;
		// add some payment type bool infuture about payment verify and more detail
		// have a look at model you created
		// error handling required modify error handling also

		const newprint = new Print({
			paymentAmount: amount,
			uniquecoupen : uniquecoupen,
			orderId : orderId,
            fileinfo : fileinfo,
		})

		const saveprint = await newprint.save()

		return res.status(200).json({message : "file uploaded" , status : "true" , data : saveprint})



	} catch (error) {
		console.log(error);
	}
}
