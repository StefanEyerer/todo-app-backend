import { NextFunction, Request, Response } from 'express';
import { Result, ValidationChain, ValidationError, validationResult } from 'express-validator';

export default abstract class BaseValidator {
    public abstract getValidationRules(): ValidationChain[];
    public async validateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        const errors: Result<ValidationError> = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            const extractedErrors = errors.array().map((error) => ({ [error.param]: error.msg }));
            res.status(400).json({ errors: extractedErrors });
        }
    }
}
