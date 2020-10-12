const to = require('await-to-js').default;
const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../../../../middlewares/error');
const {
  createAccessToken,
  sendAccessToken,
} = require('../../../../middlewares/token');

const checkEmailAndPassword = (email, password) => email && password;

const getUser = async (email, next) => {
  const [err, user] = await to(User.findOne({ email }));
  if (err) next(new ErrorHandler(err));

  return user;
};

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!checkEmailAndPassword(email, password)) {
    next(new ErrorHandler('Username/Password missing', 200));
  }

  const user = await getUser(email, next);
  if (!user) {
    next(new ErrorHandler('User not found', 200));
  } else {
    const [err, isPasswordEqual] = await to(
      bcrypt.compare(password, user.password)
    );
    if (err) next(new ErrorHandler(err));

    if (!isPasswordEqual) {
      next(new ErrorHandler('Passwords do not match', 200));
    } else {
      const token = createAccessToken(user._id);
      sendAccessToken(req, res, token);
    }
  }
};
