import { Router } from 'express';

import { routerCredentials } from './credentials/credentialsRouter';

const router = Router();

router.use('/credentials', routerCredentials);

export default router;
