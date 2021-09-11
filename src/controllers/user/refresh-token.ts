/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RefreshTokenRequest } from '../../models/api/request';
import BaseController from '../base-controller';
import RefreshTokenStore from '../../auth/refresh-token-store';

class RefreshTokenController extends BaseController {
    public async handleRequest(req: Request, res: Response): Promise<Response> {
        const requestPayload: RefreshTokenRequest = {
            refreshToken: req.body.refreshToken
        };

        try {
            const decoded = RefreshTokenStore.checkRefreshToken(requestPayload.refreshToken);

            if (!decoded) {
                return res.status(401).json({ error: 'invalid token' });
            } else {
                RefreshTokenStore.removeRefreshToken(requestPayload.refreshToken);

                const userId = decoded.userId;
                const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                RefreshTokenStore.addRefreshToken(refreshToken);

                return res.status(200).json({ accessToken, refreshToken });
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ error: 'token expired' });
            } else {
                return res.status(401).json({ error: 'invalid token' });
            }
        }
    }
}

export default new RefreshTokenController();
