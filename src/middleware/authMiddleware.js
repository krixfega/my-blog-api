const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Set the decoded user data on the request object for use in subsequent middleware or routes
    req.user = decoded;
    next();
  });
};

exports.checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role === role) {
        next();
      } else {
        return res.status(403).json({ message: 'Forbidden' });
      }
    };
  };
