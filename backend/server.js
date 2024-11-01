import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';


// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// It allows your server to handle requests that contain JSON data, making it easier to work with user input from APIs.
app.use(express.json())

// This applies the CORS middleware to your app, enabling it to handle requests from different origins.
app.use(cors());



// API endpoints || This defines a GET endpoint at the root URL (/).
app.get('/',(req, res)=>{
    res.send('API is Working... Great !')
})

// This line starts the server and tells it to listen for incoming requests on the specified port.
app.listen(port, ()=> console.log("Server Started",port));
