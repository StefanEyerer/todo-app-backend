/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { LogoutUserRequest } from '../../models/api/request';
import BaseController from '../base-controller';
import RefreshTokenStore from '../../auth/refresh-token-store';

class LogoutUserController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const requestPayload: LogoutUserRequest = {
            refreshToken: req.body.refreshToken
        };

        RefreshTokenStore.removeRefreshToken(requestPayload.refreshToken);

        return res.status(204).json(null);
    }
}

export default new LogoutUserController();
