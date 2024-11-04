import doctorModel from "../models/doctorModel.js";


// Function for change Doctor's Availability (true/false)
const changeAvailability = async (req,res) => {
    try {

        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);  // Getting doctor data by id
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})   // Update or change Availablity field in doctor data
        res.json({success:true, message:"Doctor's availability has been updated."});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {changeAvailability};