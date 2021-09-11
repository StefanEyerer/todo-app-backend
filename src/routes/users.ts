import express from 'express';

import authGuard from '../auth/auth-guard';
import * as userControllers from '../controllers/user';
import * as userValidators from '../validators/user';

const router = express.Router();

router.get(
    '/',
    authGuard.authenticate,
    userValidators.getUsers.getValidationRules(),
    userValidators.getUsers.validateRequest,
    userControllers.getUsers.handleRequest
);

router.get(
    '/:id',
    authGuard.authenticate,
    userValidators.getUser.getValidationRules(),
    userValidators.getUser.validateRequest,
    userControllers.getUser.handleRequest
);

export default router;
