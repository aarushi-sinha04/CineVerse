import {Router} from 'express';

import { createHall, deleteHall, getHalls, updateHall } from '../controllers/hall.controller';

const router = Router();

router.route("/halls").post(createHall); 
router.route("/halls/:id")
.patch(updateHall)
.get(getHalls)
.delete(deleteHall);

export default router;