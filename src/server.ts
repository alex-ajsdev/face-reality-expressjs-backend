import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

if (!MONGO_URI) {
  console.error('MONGO_URI not provided. Terminating application.');
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Could not connect to MongoDB Atlas:', err));
