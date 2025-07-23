import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all TLs (admin only)
router.get('/tls', auth(['admin']), async (req, res) => {
  try {
    const tls = await User.find({ role: 'TL' });
    res.json(tls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employees under a TL (TL only)
router.get('/team', auth(['TL']), async (req, res) => {
  try {
    const employees = await User.find({ teamLeadId: req.user.userId });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 