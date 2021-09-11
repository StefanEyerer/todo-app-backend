import { ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class GetCurrentUserValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [];
    }
}

export default new GetCurrentUserValidator();
