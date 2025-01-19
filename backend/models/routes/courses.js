const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/course');

const router = express.Router();

// Create Course
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, instructor } = req.body;
  try {
    const course = new Course({ name, description, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Read Courses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Course
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, instructor } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, description, instructor },
      { new: true }
    );
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Course
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
