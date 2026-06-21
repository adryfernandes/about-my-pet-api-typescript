import { Router } from 'express';

import { findAll } from './credentialsController';

const router = Router();

router.get('/', findAll);

export { router as routerCredentials };
