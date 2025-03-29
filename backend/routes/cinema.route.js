import {Router} from 'express';
import { createCinema, deleteCinema, getCinemas, updateCinema } from '../controllers/cinema.controller.js';

const router = Router();

router.route("/").post(createCinema).get(getCinemas); 
router.route("/:id")
.patch(updateCinema)
.get(getCinemas)
.delete(deleteCinema);

export default router;