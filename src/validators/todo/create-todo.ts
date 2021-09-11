import { body, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class CreateTodoValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [
            body('title').isString().bail(),
            body('description').isString().bail(),
            body('completed').isBoolean().bail()
        ];
    }
}

export default new CreateTodoValidator();
