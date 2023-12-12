import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import swaggerUi from "swagger-ui-express";
import { errorHandler, requestHandler } from './middleware/handler.js';

import data from "./../documentation/swagger-output.json" assert {type: 'json'};
import { trimParams } from './lib/appConfig.js';
import  router from './routes/index.js';
import { connectDB } from './config/mongodb.config.js';

connectDB();

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// api document file path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(data));

// request query and body params trim
app.use(trimParams);

// api default endpoints
app.use('/api/v1', router);

app.use(requestHandler);
app.use(errorHandler);

export { app };