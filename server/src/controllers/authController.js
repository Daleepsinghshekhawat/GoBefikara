const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler, sendSuccess, sendError } = require('../utils/apiResponse');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// @route POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, city } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return sendError(res, 'Email already registered', 400);

  const user = await User.create({ name, email, password, phone, city });
  const token = generateToken(user._id);

  sendSuccess(
    res,
    {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    },
    'Registration successful',
    201
  );
});

// @route POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return sendError(res, 'Invalid email or password', 401);
  }

  const token = generateToken(user._id);
  sendSuccess(res, {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
});

// @route GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  sendSuccess(res, { user });
});

// @route PUT /api/auth/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, bio, city } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone, bio, city },
    { new: true, runValidators: true }
  );
  sendSuccess(res, { user }, 'Profile updated');
});

// @route PUT /api/auth/change-password
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(currentPassword))) {
    return sendError(res, 'Current password is incorrect', 401);
  }
  user.password = newPassword;
  await user.save();
  sendSuccess(res, {}, 'Password changed successfully');
});
