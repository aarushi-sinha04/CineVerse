import {Router} from 'express';
import { createBooking, deleteBooking, getBooking } from '../controllers/booking.controller.js';


const router = Router();

router.route("/").post(createBooking).get(getBooking); 
router.route("/:id")
.get(getBooking)
.delete(deleteBooking);

export default router;