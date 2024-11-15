import express from 'express';
import { addDoctor, adminCancelAppointment, adminDashboard, allDoctors, appointmentsAdmin, deleteDoctor, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// Admin Routes
adminRouter.post('/add-doctor',upload.single('image'),authAdmin,addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.delete('/delete-doctor',deleteDoctor)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,adminCancelAppointment)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter;