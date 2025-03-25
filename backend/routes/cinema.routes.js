import {Router} from 'express';
import { createCinema, deleteCinema, getCinemas, updateCinema } from '../controllers/cinema.controller';

const router = Router();

router.route("/").get(getCinemas);
router.route("/create-cinema").post(createCinema);
router.route("/update-cinema/:id").patch(updateCinema);
router.route("/delete-cinema/:id").delete(deleteCinema);

export default router;