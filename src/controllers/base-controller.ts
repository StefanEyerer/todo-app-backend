import { Request, Response } from 'express';

export default abstract class BaseController {
    public abstract handleRequest(req: Request, res: Response): void;
}
