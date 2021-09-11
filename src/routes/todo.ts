import express from 'express';

import authGuard from '../auth/auth-guard';
import * as todoControllers from '../controllers/todo';
import * as todoValidators from '../validators/todo';

const router = express.Router();

router.delete(
    '/:id',
    authGuard.authenticate,
    todoValidators.deleteTodo.getValidationRules(),
    todoValidators.deleteTodo.validateRequest,
    todoControllers.deleteTodo.handleRequest
);

router.get(
    '/:id',
    authGuard.authenticate,
    todoValidators.getTodo.getValidationRules(),
    todoValidators.getTodo.validateRequest,
    todoControllers.getTodo.handleRequest
);

router.get(
    '/',
    authGuard.authenticate,
    todoValidators.getTodos.getValidationRules(),
    todoValidators.getTodos.validateRequest,
    todoControllers.getTodos.handleRequest
);

router.post(
    '/',
    authGuard.authenticate,
    todoValidators.createTodo.getValidationRules(),
    todoValidators.createTodo.validateRequest,
    todoControllers.createTodo.handleRequest
);

router.put(
    '/:id',
    authGuard.authenticate,
    todoValidators.updateTodo.getValidationRules(),
    todoValidators.updateTodo.validateRequest,
    todoControllers.updateTodo.handleRequest
);

export default router;
