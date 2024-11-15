import express from 'express';
import { bookAppointment, cancelAppointment, getProfile, listAppointments, loginUser, paymentRazorpay, paymentStripe, registerUser, updateProfile, verifyStripe } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

// User Routes
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/payment-stripe',authUser,paymentStripe)
userRouter.post('/verifyStripe',authUser,verifyStripe)


// userRouter.post('/stripe',authUser,bookAppointmentWithStripe)
// userRouter.post('/verifyStripe',authUser,verifyStripePayment)

export default userRouter;