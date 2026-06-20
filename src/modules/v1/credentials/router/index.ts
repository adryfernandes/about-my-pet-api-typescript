import { Router } from 'express';

import credentialsController from './credentials.controller';

const router = Router();

router.get('/', credentialsController.findAll);

export { router as routerCredentials };
