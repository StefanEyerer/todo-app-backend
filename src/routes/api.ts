import express from 'express';
import todoRouter from './todo';
import userRouter from './user';
import usersRouter from './users';

const router = express.Router();

router.use('/todo', todoRouter);
router.use('/user', userRouter);
router.use('/users', usersRouter);

export default router;
