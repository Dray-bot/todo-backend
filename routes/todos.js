const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new todo
router.post('/', async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: 'Task is required' });

    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Todo not found' });

    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
