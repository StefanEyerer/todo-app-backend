import { param, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class GetTodoValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [param('id').isMongoId().bail()];
    }
}

export default new GetTodoValidator();
