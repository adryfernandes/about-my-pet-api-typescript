import { Router } from 'express';

import { routerCredentials } from './credentials/router';

const router = Router();

router.use('/credentials', routerCredentials);

export default router;
