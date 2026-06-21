import { Router } from 'express';

import credentialsController from './credentialsController';

const router = Router();

router.get('/', credentialsController.loginTest);

export { router as routerCredentials };
