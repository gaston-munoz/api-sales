import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import signale from 'signale';
const logger = signale.scope('DB');
dotenv.config({ path: path.join(__dirname, '../.env') });

const { URI_MONGODB: URI } = process.env;

const connection = () => { mongoose.connect(URI, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true
})
  .then(connect => logger.success('Cloud MongoDB is Connected'))
  .catch(err => logger.error('ERROR Cloud MongoDB', err.message));
}

export default connection;