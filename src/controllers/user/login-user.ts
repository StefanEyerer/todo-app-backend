/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginUserRequest } from '../../models/api/request';
import BaseController from '../base-controller';
import RefreshTokenStore from '../../auth/refresh-token-store';
import UserModel from '../../models/database/user';

class LoginUserController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const requestPayload: LoginUserRequest = {
            username: req.body.username,
            password: req.body.password
        };

        try {
            const user = await UserModel.findOne({ username: requestPayload.username });
            if (user) {
                const userHashedPw = user.get('password', String);
                const success = await bcryptjs.compare(requestPayload.password, userHashedPw);
                if (success) {
                    const userId = user.get('_id', String);
                    const payload = { userId };
                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                    RefreshTokenStore.addRefreshToken(refreshToken);

                    return res.status(200).json({ accessToken, refreshToken });
                }
            }
            return res.status(400).json({ error: 'wrong credentials' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new LoginUserController();
