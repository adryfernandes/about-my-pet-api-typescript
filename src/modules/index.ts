import { Router } from 'express';

import routerV1 from './v1';

import { claimsMiddleware } from '@/middleware/claims.middleware';

const router = Router();

router.use('/v1', claimsMiddleware, routerV1);

export default router;
