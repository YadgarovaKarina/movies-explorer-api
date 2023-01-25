import { Router } from 'express';

import {
  getMovies,
  createMovie,
  deleteMovie,
} from '../controllers/movies.js';

import {
  movieIdValidator,
  movieBodyValidator,
} from '../validators/moviesValidator.js';

export const router = Router();

router.get('/', movieBodyValidator, getMovies);
router.post('/', movieBodyValidator, createMovie);
router.delete('/:movieId', movieIdValidator, deleteMovie);
