import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { errors } from 'celebrate';
import { NotFoundError } from './errors/NotFoundError.js';
import { router as indexRouters } from './routes/index.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const app = express();

const { PORT = 3002, NODE_ENV = 'development' } = process.env;

const config = dotenv.config({ path: NODE_ENV === 'production' ? '.env' : '.env.common' }).parsed;

app.set('config', config);

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());

app.use(helmet());

app.use(cors({
  origin: '*',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],
}));

mongoose.set('runValidators', true);

app.use(requestLogger);

app.use(indexRouters);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
