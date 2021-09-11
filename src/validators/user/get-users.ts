import { ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class GetUsersValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [];
    }
}

export default new GetUsersValidator();
