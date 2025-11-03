const express = require('express');
const {
  addEnquiry,
  claimEnquiry,
  getUnclaimedEnquiries,
  getMyLeads
} = require('../controllers/enquiryController');
const { body, validationResult } = require('express-validator');

const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../validation/validateRequest');

const router = express.Router();

router.post(
  '/public',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Valid email is required'),
    body('course')
      .notEmpty()
      .withMessage('Course is required'),
    body('phone')
      .isMobilePhone()
      .withMessage('Valid phone number is required'),
    body('message')
      .notEmpty()
      .withMessage('Message is required'),
  ],
  validateRequest,
  addEnquiry
);
router.put('/claim/:id', protect, claimEnquiry);
router.get('/unclaimed', protect, getUnclaimedEnquiries);
router.get('/my-leads', protect, getMyLeads);

module.exports = router;
