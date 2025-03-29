import {Router} from 'express';

import { createHall, deleteHall, getHalls, updateHall } from '../controllers/hall.controller.js';

const router = Router();

router.route("/").post(createHall).get(getHalls); 
router.route("/:id")
.patch(updateHall)
.get(getHalls)
.delete(deleteHall);

export default router;