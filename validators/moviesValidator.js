import { Joi, celebrate, Segments } from 'celebrate';

export const urlSchema = /.+/;

export const movieIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const movieBodyValidator = celebrate({
  [Segments.BODY]: Joi.object({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().pattern(urlSchema).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().min(2).required(),
    nameRU: Joi.string().min(2).required(),
    nameEN: Joi.string().min(2).required(),
  }),
});
