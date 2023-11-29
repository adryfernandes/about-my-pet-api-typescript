import './utils/prototypes';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

// import { AppDataSource } from './database/dataSource';
import swaggerDocument from '../public/swagger.json';

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import router from './router';

const PORT = process?.env?.PORT || 3000;

const init = async (): Promise<void> => {
  try {
    // Inicia a conexão com o banco de dados
    // await AppDataSource.initialize();

    // Inicia roteamento através do express
    const app: Express = express();
    app.use(express.json());
    app.use(cors());

    app.use('/api', router);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`
       __   ____   __   _  _  ____    ____  ____  ____ 
      / _\\ (  _ \\ /  \\ / )( \\(_  _)  (  _ \\(  __)(_  _)
     /    \\ ) _ ((  O )) \\/ (  )(     ) __/ ) _)   )(  
     \\_/\\_/(____/ \\__/ \\____/ (__)   (__)  (____) (__)\n
     O servidor está rodando na porta: ${PORT}
     Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error(error);
  }
};

init();
