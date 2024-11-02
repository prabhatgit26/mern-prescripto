import express from 'express';
import { addDoctor, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRouter = express.Router();

// Admin Routes
adminRouter.post('/add-doctor',upload.single('image'),authAdmin,addDoctor);
adminRouter.post('/login',loginAdmin);

export default adminRouter;