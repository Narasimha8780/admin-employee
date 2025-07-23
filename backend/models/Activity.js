import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  screenTime: { type: Number, default: 0 },
  idleTime: { type: Number, default: 0 }
});

export default mongoose.model('Activity', activitySchema); 