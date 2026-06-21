import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../public/swagger.json';

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import router from './modules';
import { isEmpty } from './shared/utils/functions';
import { initEnv } from './shared/utils/initServer';

const init = (): void => {
  const DEFAULT_PORT = 3000;

  try {
    // Inicia a conexão com o banco de dados
    // await AppDataSource.initialize();

    initEnv();

    const app = express();

    app.disable('x-powered-by');
    app.use(express.json());

    const allowedOrigins = (process.env.CORS_ORIGINS ?? '').split(',').filter(Boolean);

    app.use(
      cors({
        origin: isEmpty(allowedOrigins) ? allowedOrigins : false,
      }),
    );

    app.use('/api', router);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(errorHandlerMiddleware);

    const PORT = process.env.PORT ?? DEFAULT_PORT;
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console -- Intentional server startup log
      console.log(`
          __   ____   __   _  _  ____    ____  ____  ____ 
          / _\\ (  _ \\ /  \\ / )( \\(_  _)  (  _ \\(  __)(_  _)
        /    \\ ) _ ((  O )) \\/ (  )(     ) __/ ) _)   )(  
        \\_/\\_/(____/ \\__/ \\____/ (__)   (__)  (____) (__)\n
        O servidor está rodando na porta: ${PORT}
        Ambiente: ${process.env.NODE_ENV ?? 'development'}
      `);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
