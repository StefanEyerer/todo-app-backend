/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Todo } from '../../models/api/response';
import BaseController from '../base-controller';
import TodoModel from '../../models/database/todo';

class DeleteTodoController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).decoded.userId;
        const id = req.params.id as any;

        try {
            const deletedTodo = await TodoModel.findOneAndDelete({ $and: [{ _id: id }, { user: userId }] }).populate(
                'user'
            );

            if (deletedTodo) {
                const user = deletedTodo.get('user');
                const responsePayload: Todo = {
                    id: deletedTodo.get('_id', String),
                    title: deletedTodo.get('title', String),
                    description: deletedTodo.get('description', String),
                    completed: deletedTodo.get('completed', Boolean),
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

export default new DeleteTodoController();
