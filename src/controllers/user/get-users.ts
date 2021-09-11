/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserList } from '../../models/api/response';
import BaseController from '../base-controller';
import UserModel from '../../models/database/user';

class GetUsersController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserModel.find();
            const responsePayload: UserList = {
                items: [
                    ...users.map((user: any) => {
                        return {
                            id: user.get('_id', String),
                            email: user.get('email', String),
                            username: user.get('username', String)
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

export default new GetUsersController();
