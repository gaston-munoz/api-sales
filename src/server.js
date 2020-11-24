import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import signale from 'signale';
import morgan from 'morgan';
import dbConnection from './db';
import {
    homeRouter,
    productsRouter,
    usersRouter,
    categoryRouter,
    salesRouter
} from './routes';

const logger = signale.scope('APP');
dotenv.config({ path: path.join(__dirname, '../.env') });

dbConnection();
const { PORT } = process.env 

const server = express();
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
server.use(express.json());

server.use('/', homeRouter);
server.use('/api/users', usersRouter);
server.use('/api/products', productsRouter); 
server.use('/api/category', categoryRouter);
server.use('/api/sales', salesRouter);

server.listen(PORT, () => {
    logger.success(`Server listening on port ${PORT}`)
});



