import { Router } from 'express';

import credentialsController from './credentialsController';

const router = Router();

router.get('/', credentialsController.findAll);

export { router as routerCredentials };
