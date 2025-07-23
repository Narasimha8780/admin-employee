import express from 'express';
import Activity from '../models/Activity.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Post activity (employee)
router.post('/', auth(['employee']), async (req, res) => {
  try {
    const { date, screenTime, idleTime } = req.body;
    let activity = await Activity.findOne({ userId: req.user.userId, date });
    if (activity) {
      activity.screenTime += screenTime;
      activity.idleTime += idleTime;
      await activity.save();
    } else {
      activity = new Activity({ userId: req.user.userId, date, screenTime, idleTime });
      await activity.save();
    }
    res.json({ message: 'Activity updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get activity for a user (admin, TL, or employee)
router.get('/:userId', auth(['admin', 'TL', 'employee']), async (req, res) => {
  try {
    const { userId } = req.params;
    // TL can only access their team
    if (req.user.role === 'TL') {
      const employee = await User.findOne({ _id: userId, teamLeadId: req.user.userId });
      if (!employee) return res.status(403).json({ message: 'Forbidden' });
    }
    // Employee can only access their own data
    if (req.user.role === 'employee' && req.user.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const activities = await Activity.find({ userId });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 