/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TodoList } from '../../models/api/response';
import BaseController from '../base-controller';
import TodoModel from '../../models/database/todo';

class GetTodosController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).decoded.userId;

        try {
            const todos = await TodoModel.find({ user: userId }).populate('user');

            const responsePayload: TodoList = {
                items: [
                    ...todos.map((todo) => {
                        const user = todo.get('user');
                        return {
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
                    })
                ]
            };
            return res.status(200).json(responsePayload);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new GetTodosController();
