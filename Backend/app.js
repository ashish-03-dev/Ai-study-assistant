import express from 'express';
import cors from 'cors';
import documentRoutes from './routes/documentRoutes.js';
import queryRoutes from './routes/queryRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/documents', documentRoutes);
app.use('/api/queries', queryRoutes);

export default app;