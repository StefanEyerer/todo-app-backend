/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { RegisterUserRequest } from '../../models/api/request';
import { User } from '../../models/api/response';
import BaseController from '../base-controller';
import UserModel from '../../models/database/user';

class RegisterUserController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const hashedPw = await bcryptjs.hash(req.body.password, 10);
        const requestPayload: RegisterUserRequest = {
            email: req.body.email,
            username: req.body.username,
            password: hashedPw
        };

        try {
            const user = await UserModel.findOne({
                $or: [{ email: requestPayload.email }, { username: requestPayload.username }]
            });
            if (user) {
                return res.status(409).json({ error: 'email or username already exists' });
            }

            const newUser = new UserModel(requestPayload);
            const savedUser = await newUser.save();

            const responsePayload: User = {
                id: savedUser.get('_id', String),
                email: savedUser.get('email', String),
                username: savedUser.get('username', String)
            };

            return res.status(201).json(responsePayload);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new RegisterUserController();
