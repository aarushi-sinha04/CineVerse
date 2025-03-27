import {Router} from 'express';
import { createCinema, deleteCinema, getCinemas, updateCinema } from '../controllers/cinema.controller.js';

const router = Router();

router.route("/cinemas").post(createCinema); 
router.route("/cinemas/:id")
.patch(updateCinema)
.get(getCinemas)
.delete(deleteCinema);

export default router;