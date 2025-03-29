import {Router} from 'express';
import { createShowtime, deleteShowtime, getShowtime, updateShowtime } from '../controllers/showtime.controller.js';


const router = Router();

router.route("/").post(createShowtime).get(getShowtime); 
router.route("/:id")
.patch(updateShowtime)
.get(getShowtime)
.delete(deleteShowtime);

export default router;