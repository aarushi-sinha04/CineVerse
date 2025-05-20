import {Router} from 'express';
import { createUser, getUser, deleteUser } from '../controllers/user.controller.js';
const router = Router();

router.route("/").post(createUser).get(getUser);
router.route("/:id")
.delete(deleteUser)
.get(getUser);

export default router;
