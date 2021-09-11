import { body, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class RegisterUserValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [body('email').isEmail().bail(), body('username').isString().bail(), body('password').isString().bail()];
    }
}

export default new RegisterUserValidator();
