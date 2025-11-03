// models/Enquiry.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    course: { type: String, required: false },
    phone: { type: String, required: false },
    message: { type: String, required: false },
    // If null => unclaimed (public). If set => claimed by that employee.
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    // Optional: claim timestamp
    claimedAt: { type: Date, default: null },
    // optional status field
    status: { type: String, enum: ['new', 'claimed', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
