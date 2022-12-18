import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { constants } from 'http2';
import { NotFoundError } from './errors/NotFoundError.js';
import { router as userRouter } from './routes/users.js';
import { router as moviesRouter } from './routes/movies.js';
import { login, createUser } from './controllers/users.js';
import { auth } from './middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from './validators/userValidator.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const app = express();

const { PORT = 3000, NODE_ENV = 'development' } = process.env;

const config = dotenv.config({ path: NODE_ENV === 'production' ? '.env' : '.env.common' }).parsed;

app.set('config', config);

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
}));

mongoose.set('runValidators', true);

app.use(requestLogger);

app.post('/signin', userLoginValidator, login);

app.post('/signup', userBodyValidator, createUser);

app.use(auth);

app.use('/users', userRouter);

app.use('/movies', moviesRouter);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
