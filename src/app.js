import express from 'express';
import morgan from 'morgan';
import routes from './routes/productoRoutes.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use('/api/v1', routes);

export default app;
