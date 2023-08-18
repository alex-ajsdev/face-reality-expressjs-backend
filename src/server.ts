import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import selectionRoutes from './routes/selectionRoutes';

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000; // Default to port 3000 if not provided

if (!MONGO_URI) {
  console.error('MONGO_URI not provided. Terminating application.');
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Could not connect to MongoDB Atlas:', err));

// Middleware
app.use(express.json()); // Use Express's built-in JSON parser
app.use(cors());

// Routes
app.use(`/img`, express.static('img'));
app.use('/images', imageRoutes);
app.use('/selections', selectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
