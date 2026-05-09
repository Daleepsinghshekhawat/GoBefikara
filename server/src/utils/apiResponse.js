const sendSuccess = (res, data = {}, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({ success: true, message, ...data });
};

const sendError = (res, message = 'Error', statusCode = 500) => {
  res.status(statusCode).json({ success: false, message });
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { sendSuccess, sendError, asyncHandler };
