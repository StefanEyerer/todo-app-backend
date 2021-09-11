import { ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class GetTodoValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [];
    }
}

export default new GetTodoValidator();
