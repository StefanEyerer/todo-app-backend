import express from 'express';

import authGuard from '../auth/auth-guard';
import * as userControllers from '../controllers/user';
import * as userValidators from '../validators/user';

const router = express.Router();

router.get(
    '/profile',
    authGuard.authenticate,
    userValidators.getCurrentUser.getValidationRules(),
    userValidators.getCurrentUser.validateRequest,
    userControllers.getCurrentUser.handleRequest
);

router.post(
    '/login',
    userValidators.loginUser.getValidationRules(),
    userValidators.loginUser.validateRequest,
    userControllers.loginUser.handleRequest
);

router.post(
    '/logout',
    userValidators.logoutUser.getValidationRules(),
    userValidators.logoutUser.validateRequest,
    userControllers.logoutUser.handleRequest
);

router.post(
    '/token/refresh',
    userValidators.refreshToken.getValidationRules(),
    userValidators.refreshToken.validateRequest,
    userControllers.refreshToken.handleRequest
);

router.post(
    '/register',
    userValidators.registerUser.getValidationRules(),
    userValidators.registerUser.validateRequest,
    userControllers.registerUser.handleRequest
);

export default router;
