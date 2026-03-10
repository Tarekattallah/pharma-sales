const jwt  = require('jsonwebtoken');
const User = require('../modules/users/user.model');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'مش مسجل دخول — أرسل الـ token'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم مش موجود'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'الحساب موقوف'
      });
    }

    req.user = user;
    next();

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Token غير صحيح' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token انتهت صلاحيته' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { protect };