import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../public/swagger.json';

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import router from './modules';

const EMPTY_LIST = 0;
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT ?? DEFAULT_PORT;

const init = (): void => {
  try {
    // Inicia a conexão com o banco de dados
    // await AppDataSource.initialize();

    const app = express();

    app.disable('x-powered-by');
    app.use(express.json());

    const allowedOrigins = (process.env.CORS_ORIGINS ?? '').split(',').filter(Boolean);
    const hasAllowedOrigins = allowedOrigins.length > EMPTY_LIST;

    app.use(
      cors({
        origin: hasAllowedOrigins ? allowedOrigins : false,
      }),
    );

    app.use('/api', router);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console -- log intencional de startup do servidor
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
