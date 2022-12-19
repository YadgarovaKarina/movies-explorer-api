import Movie from '../models/movie.js';
import { ServerError } from '../errors/ServerError.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';

export const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

export const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  Movie.create(req.body)
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

export const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Данные не найдены'));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Доступ запрещен'));
      } else {
        movie.remove();
        res.send({ data: movie });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};
