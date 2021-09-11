/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UpdateTodoRequest } from '../../models/api/request';
import { Todo } from '../../models/api/response';
import BaseController from '../base-controller';
import TodoModel from '../../models/database/todo';

class UpdateTodoController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).decoded.userId;
        const id = req.params.id as any;
        const requestPayload: UpdateTodoRequest = {
            completed: req.body.completed
        };

        try {
            const newAttributes = { ...requestPayload };
            if (!newAttributes.completed && newAttributes.completed !== false) {
                delete newAttributes.completed;
            }

            const updatedTodo = await TodoModel.findOneAndUpdate(
                { $and: [{ _id: id }, { user: userId }] },
                newAttributes,
                {
                    new: true
                }
            ).populate('user');

            if (updatedTodo) {
                const user = updatedTodo.get('user');
                const responsePayload: Todo = {
                    id: updatedTodo.get('_id', String),
                    title: updatedTodo.get('title', String),
                    description: updatedTodo.get('description', String),
                    completed: updatedTodo.get('completed', Boolean),
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

export default new UpdateTodoController();
