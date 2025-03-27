import {Router} from 'express';
import { createMovie, deleteMovie, getMovies, updateMovie } from '../controllers/movie.conttroller.js';

const router = Router();

router.route("/movies").post(createMovie); 
router.route("/movies/:id")
.patch(updateMovie)
.get(getMovies)
.delete(deleteMovie);

export default router;