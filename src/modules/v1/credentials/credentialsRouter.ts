import { Router } from 'express';

import credentialsController from './credentialsController';

const router = Router();

router.post('/login', credentialsController.login);

export { router as routerCredentials };
