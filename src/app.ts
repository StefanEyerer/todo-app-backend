import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import apiRouter from './routes/api';
import errorHandler from './error/error-handler';

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use(errorHandler.handle404);
app.use(errorHandler.handleError);

export default app;
