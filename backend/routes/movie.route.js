import {Router} from 'express';
import { createMovie, deleteMovie, getMovies, updateMovie } from '../controllers/movie.conttroller.js';

const router = Router();

router.route("/").post(createMovie).get(getMovies); 
router.route("/:id")
.patch(updateMovie)
.get(getMovies)
.delete(deleteMovie);

export default router;