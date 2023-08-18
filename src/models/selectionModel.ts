import mongoose from 'mongoose';

const selectionSchema = new mongoose.Schema({
  totalFake: Number,
  totalFakeFound: Number,
  totalRealFound: Number,
  algorithm: String
});

const Selection = mongoose.model('Selection', selectionSchema);
export default Selection;
