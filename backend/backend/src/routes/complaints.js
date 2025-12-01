const express = require('express');
const prisma = require('../prismaClient');
const auth = require('../middlewares/auth');

const router = express.Router();
router.use(auth);

// Create a complaint
router.post('/', async (req, res) => {
  try {
    const { vehicleId, type, priority, subject, description } = req.body;
    if (!subject || !type) {
      return res.status(400).json({ error: 'subject and type are required' });
    }
    const complaint = await prisma.complaint.create({
      data: {
        vehicleId: vehicleId || null,
        userId: req.user.id,
        type,
        priority: priority || 'medium',
        subject,
        description: description || null
      }
    });
    res.status(201).json({ data: complaint });
  } catch (err) {
    console.error('Create complaint error', err);
    res.status(500).json({ error: 'server error' });
  }
});

// List all complaints (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { status, type, vehicleId, userId } = req.query;
    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (vehicleId) where.vehicleId = vehicleId;
    if (userId) where.userId = userId;
    
    // If not admin, only show user's own complaints
    if (req.user.role !== 'admin') {
      where.userId = req.user.id;
    }
    
    const complaints = await prisma.complaint.findMany({
      where,
      include: {
        vehicle: { select: { id: true, registrationNo: true, imei: true } },
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ data: complaints });
  } catch (err) {
    console.error('List complaints error', err);
    res.status(500).json({ error: 'server error' });
  }
});

// Get single complaint
router.get('/:id', async (req, res) => {
  try {
    const complaint = await prisma.complaint.findUnique({
      where: { id: req.params.id },
      include: {
        vehicle: { select: { id: true, registrationNo: true, imei: true, make: true, model: true } },
        user: { select: { id: true, name: true, email: true } }
      }
    });
    if (!complaint) {
      return res.status(404).json({ error: 'not found' });
    }
    // Check access
    if (req.user.role !== 'admin' && complaint.userId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    res.json({ data: complaint });
  } catch (err) {
    console.error('Get complaint error', err);
    res.status(500).json({ error: 'server error' });
  }
});

// Update complaint (respond, change status)
router.patch('/:id', async (req, res) => {
  try {
    const existing = await prisma.complaint.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ error: 'not found' });
    }
    // Only admin can update complaints or the owner can add description
    if (req.user.role !== 'admin' && existing.userId !== req.user.id) {
      return res.status(403).json({ error: 'forbidden' });
    }
    
    const { status, response, priority, description } = req.body;
    const updateData = {};
    
    // Admin can update status, response, priority
    if (req.user.role === 'admin') {
      if (status) updateData.status = status;
      if (response !== undefined) updateData.response = response;
      if (priority) updateData.priority = priority;
      if (status === 'resolved' || status === 'closed') {
        updateData.resolvedAt = new Date();
      }
    }
    
    // Owner can update description
    if (existing.userId === req.user.id && description !== undefined) {
      updateData.description = description;
    }
    
    const complaint = await prisma.complaint.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json({ data: complaint });
  } catch (err) {
    console.error('Update complaint error', err);
    res.status(500).json({ error: 'server error' });
  }
});

// Delete complaint (admin only)
router.delete('/:id', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'forbidden' });
    }
    await prisma.complaint.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete complaint error', err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
