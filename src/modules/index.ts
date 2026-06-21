import { Router } from 'express';

import routerV1 from './v1';

import { claimsMiddleware } from '@/middleware/claimsMiddleware';

const router = Router();

router.use('/v1', routerV1);

export default router;
