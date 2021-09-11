import { body, param, ValidationChain } from 'express-validator';
import BaseValidator from '../base-validator';

class UpdateTodoValidator extends BaseValidator {
    public getValidationRules(): ValidationChain[] {
        return [param('id').isMongoId().bail(), body('completed').optional().isBoolean().bail()];
    }
}

export default new UpdateTodoValidator();
