// routes/enquiryRoutes.js
const express = require('express');
const {
  addEnquiry,
  claimEnquiry,
  getUnclaimedEnquiries,
  getMyLeads
} = require('../controllers/enquiryController');

const { protect } = require('../middleware/authMiddleware'); // assumes module.exports = { protect }

const router = express.Router();

// Public: client submits an enquiry (no auth)
router.post('/public', addEnquiry);

// Protected: employees only routes
router.put('/claim/:id', protect, claimEnquiry);
router.get('/unclaimed', protect, getUnclaimedEnquiries);
router.get('/my-leads', protect, getMyLeads);

module.exports = router;
