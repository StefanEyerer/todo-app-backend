/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import BaseController from '../base-controller';
import { CreateTodoRequest } from '../../models/api/request';
import { Todo } from '../../models/api/response';
import TodoModel from '../../models/database/todo';

class CreateTodoController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).decoded.userId;
        const requestPayload: CreateTodoRequest = {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        };

        try {
            const newTodo = await new TodoModel({ ...requestPayload, user: userId }).populate('user');
            const savedTodo = await newTodo.save();

            const user = savedTodo.get('user');
            const responsePayload: Todo = {
                id: savedTodo.get('_id', String),
                title: savedTodo.get('title', String),
                description: savedTodo.get('description', String),
                completed: savedTodo.get('completed', Boolean),
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            };
            return res.status(201).json(responsePayload);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new CreateTodoController();
