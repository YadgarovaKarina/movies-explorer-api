import mongoose from 'mongoose';
import isUrl from 'validator/lib/isURL.js';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: () => 'Ссылка на постер фильма должна быть http(s)-URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: () => 'Ссылка на трейлер должна быть http(s)-URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: () => 'Ссылка на изображение должна быть http(s)-URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    minlength: 2,
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 2,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    required: true,
  },
});

export default mongoose.model('movie', movieSchema);
