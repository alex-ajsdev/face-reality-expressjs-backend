import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';
import selectionRoutes from './routes/selectionRoutes';

const app = express();

// Middleware
app.use(express.json()); // Use Express's built-in JSON parser
app.use(cors());

// Routes
app.use(`/img`, express.static('../img'));
app.use('/images', imageRoutes);
app.use('/selections', selectionRoutes);

export default app;
