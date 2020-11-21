import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import signale from 'signale';
import morgan from 'morgan';
import dbConnection from './db';
import {
    productsRouter,
    usersRouter
} from './routes';

const logger = signale.scope('APP');
dotenv.config({ path: path.join(__dirname, '../.env') });

dbConnection();
const { PORT } = process.env 

const server = express();
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
server.use(express.json());

server.use('/users', usersRouter);
server.use('/products', productsRouter);


server.listen(PORT, () => {
    logger.success(`Server run in port ${PORT}`)
});



