/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { User } from '../../models/api/response';
import BaseController from '../base-controller';
import UserModel from '../../models/database/user';

class GetCurrentUserController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const userId = (req as any).decoded.userId;

        try {
            const user = await UserModel.findById(userId);

            if (user) {
                const responsePayload: User = {
                    id: user.get('_id', String),
                    email: user.get('email', String),
                    username: user.get('username', String)
                };
                return res.status(200).json(responsePayload);
            } else {
                return res.status(404).json({ error: 'requested user was not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new GetCurrentUserController();
