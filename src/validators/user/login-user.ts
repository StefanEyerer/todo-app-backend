import { body, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class LoginUserValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [body('username').isString().bail(), body('password').isString().bail()];
    }
}

export default new LoginUserValidator();
