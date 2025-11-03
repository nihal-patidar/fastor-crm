const express = require('express');
const { body, validationResult } = require('express-validator');
const { registerEmployee, loginEmployee } = require('../controllers/authController');
const { validateRequest } = require('../validation/validateRequest');

const router = express.Router();


// Register Route with validation
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  validateRequest,
  registerEmployee
);

// Login Route with validation
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  loginEmployee
);

module.exports = router;
