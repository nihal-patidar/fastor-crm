// controllers/enquiryController.js
const Enquiry = require('../models/Enquiry');
const Employee = require('../models/Employee'); // optional, for validation/populate

// PUBLIC - Add enquiry (no auth required)
const addEnquiry = async (req, res) => {
  try {
    const { name, email, course, phone, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      course,
      phone,
      message
    });

    return res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry
    });
  } catch (error) {
    console.error('Add Enquiry Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PROTECTED - Claim an enquiry by id (employee must be logged in)
// sets claimedBy = req.user._id and claimedAt/status
const claimEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const employeeId = req.user && req.user._id;

    if (!employeeId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    if (enquiry.claimedBy) {
      // Already claimed
      // optionally: return 400 or 409
      return res.status(400).json({ message: 'Enquiry already claimed' });
    }

    enquiry.claimedBy = employeeId;
    enquiry.claimedAt = new Date();
    enquiry.status = 'claimed';

    await enquiry.save();

    // populate claimedBy for response (optional)
    await enquiry.populate({ path: 'claimedBy', select: 'name email' }).execPopulate?.() || await enquiry.populate('claimedBy', 'name email');

    return res.status(200).json({
      message: 'Enquiry claimed successfully',
      enquiry
    });
  } catch (error) {
    console.error('Claim Enquiry Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PROTECTED - Get unclaimed enquiries (public leads inside CRM)
// Supports pagination: ?page=1&limit=10
const getUnclaimedEnquiries = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = { claimedBy: null };

    const [total, enquiries] = await Promise.all([
      Enquiry.countDocuments(filter),
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      enquiries
    });
  } catch (error) {
    console.error('Get Unclaimed Enquiries Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PROTECTED - Get enquiries claimed by logged-in employee
// Supports pagination: ?page=1&limit=10
const getMyLeads = async (req, res) => {
  try {
    const employeeId = req.user && req.user._id;
    if (!employeeId) return res.status(401).json({ message: 'Unauthorized' });

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = { claimedBy: employeeId };

    const [total, enquiries] = await Promise.all([
      Enquiry.countDocuments(filter),
      Enquiry.find(filter)
        .sort({ claimedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('claimedBy', 'name email')
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      enquiries
    });
  } catch (error) {
    console.error('Get My Leads Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addEnquiry,
  claimEnquiry,
  getUnclaimedEnquiries,
  getMyLeads
};
