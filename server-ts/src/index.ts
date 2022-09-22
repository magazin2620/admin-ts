require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { dataSource } from './db';
import cookieParser from 'cookie-parser';

dataSource
  .initialize()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:8080'],
      })
    );

    routes(app);

    app.listen(8000, () => {
      console.log('listening port 8000');
    });
  })
  .catch((error) => console.log(error));
