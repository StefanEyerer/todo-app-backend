import debug from 'debug';
import { Request, Response } from 'express';

class ErrorHandler {
    public handle404(req: Request, res: Response): void {
        res.status(404).json({ error: 'route not found' });
    }
    public handleError(err: Error, req: Request, res: Response): void {
        debug('app')(err);
        res.status(500).json({ error: err });
    }
}

export default new ErrorHandler();
