import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'TL', 'employee'], required: true },
  teamLeadId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('User', userSchema); 