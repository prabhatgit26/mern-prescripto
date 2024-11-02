import validator from "validator";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';


// API for adding Doctor 
const addDoctor = async (req,res) => {

    try {

        
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        

        //checking for all data to add doctor 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({success:false, message:"Missing info! Please fill out all fields."})
        }
        
        // validating email format 
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Kindly Enter a Valid Email."})  
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({success:false, message:"Kindly Enter a Strong Password."})   
        }

        // hashing doctor password | encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
   
        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        //Doctor Data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true, message:"New Doctor Added Successfully."});


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});   
        
    }
}


// API for admin login
const loginAdmin = async (req, res) => {

    try {
        
        const  {email, password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password,process.env.JWT_SECRET);

            res.json({success:true, message:"Welcome Admin ! Login Successful.", token})
            
        }else{
            res.json({success:false, message:"Invalid credentials."})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export { addDoctor, loginAdmin};