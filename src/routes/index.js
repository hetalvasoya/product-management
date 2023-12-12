import userRouter from './user.route.js';
import productRouter from './product.route.js';
import express  from 'express';

const app = express();

app.use('/', userRouter);
app.use('/product', productRouter);

export default app;