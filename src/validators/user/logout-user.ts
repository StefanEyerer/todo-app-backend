import { body, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class LogoutUserValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [body('refreshToken').isString().bail()];
    }
}

export default new LogoutUserValidator();
