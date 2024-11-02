import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(cors());

// API endpoints 
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin

app.get('/',(req, res)=>{
    res.send('API is Working... Great !')
})

app.listen(port, ()=> console.log("Server Started",port));