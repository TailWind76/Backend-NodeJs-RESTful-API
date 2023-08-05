const express = require('express');
const router = express.Router();
const Resource = require('../models/model');

// GET /api/resource - Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// GET /api/resource/:id - Get resource by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

// POST /api/resource - Create a new resource
router.post('/', async (req, res) => {
  try {
    const newResource = await Resource.create(req.body);
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create resource' });
  }
});

// PUT /api/resource/:id - Update resource by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update resource' });
  }
});

// DELETE /api/resource/:id - Delete resource by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ message: `Resource with ID ${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

module.exports = router;
