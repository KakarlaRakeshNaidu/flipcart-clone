// backend/src/middlewares/authMiddleware.js
// JWT authentication middleware — extracts userId from Bearer token
// and attaches it to req.userId for downstream handlers.

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload.',
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid or malformed token.',
    });
  }
};

module.exports = authMiddleware;
