/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthGuard {
    public authenticate(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'invalid token' });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            (req as any).decoded = decoded;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ error: 'token expired' });
            } else {
                res.status(401).json({ error: 'invalid token' });
            }
        }
    }
}

export default new AuthGuard();
