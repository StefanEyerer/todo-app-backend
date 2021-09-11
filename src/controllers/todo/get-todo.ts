/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Todo } from '../../models/api/response';
import BaseController from '../base-controller';
import TodoModel from '../../models/database/todo';

class GetTodoController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).decoded.userId;
        const id = req.params.id as any;

        try {
            const todo = await TodoModel.findOne({ $and: [{ _id: id }, { user: userId }] }).populate('user');

            if (todo) {
                const user = todo.get('user');
                const responsePayload: Todo = {
                    id: todo.get('_id', String),
                    title: todo.get('title', String),
                    description: todo.get('description', String),
                    completed: todo.get('completed', Boolean),
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }
                };
                return res.status(200).json(responsePayload);
            } else {
                return res.status(404).json({ error: 'requested todo was not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new GetTodoController();
