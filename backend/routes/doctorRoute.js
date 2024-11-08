import express from 'express';
import { doctorList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

// Doctor Routes
doctorRouter.get('/list',doctorList);

export default doctorRouter;