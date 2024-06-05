require('dotenv').config()
import express from 'express';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import AppError from './utils/appError';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes';
import userRouter from './routes/users.routes';
import transactionRouter from './routes/transactions.routes';
import packageRouter from './routes/packages.routes';
import categoryRouter from './routes/categories.routes';
import postRouter from './routes/posts.routes';
import testRouter from './routes/test.routes';

const app = express();
const port = process.env.PORT;
const url = process.env.DB_URL;

app.use(
    cors({
        credentials: true,
    })
)
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api/packages', packageRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/posts', postRouter)
app.use('/api/test', testRouter)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
});

mongoose.connect(url)
app.listen(port, ()=>{
    console.log(`you are listening on port ${port}`)
})