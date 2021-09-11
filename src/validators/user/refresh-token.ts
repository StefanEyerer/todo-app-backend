import { body, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class RefreshTokenValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [body('refreshToken').isString().bail()];
    }
}

export default new RefreshTokenValidator();
