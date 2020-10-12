const { verify, sign } = require('jsonwebtoken');
const { ErrorHandler } = require('../middlewares/error');

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1] || bearer[0];
    verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(new ErrorHandler(err, 401));
      }

      res.locals.userId = decoded.userId;
      next();
    });
  }
};

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.SECRET, { expiresIn: '1d' });
};

const sendAccessToken = (_req, res, accessToken) => {
  res.status(200).json({ error: 0, accessToken });
};

module.exports = { createAccessToken, sendAccessToken, verifyToken };
