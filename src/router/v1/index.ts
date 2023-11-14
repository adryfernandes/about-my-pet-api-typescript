import { Router } from 'express';

const router = Router();

router.use('/primeiro', () => {
  // eslint-disable-next-line no-console
  console.log('primeira rota');
});

export default router;
