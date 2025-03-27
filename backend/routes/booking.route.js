import {Router} from 'express';
import { createBooking, deleteBooking, getBooking } from '../controllers/booking.controller.js';


const router = Router();

router.route("/booking").post(createBooking); 
router.route("/booking/:id")
.get(getBooking)
.delete(deleteBooking);

export default router;