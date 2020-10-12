const to = require('await-to-js').default;
const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../../../../middlewares/error');

const checkEmailAndPassword = (email, password, name) =>
  email && password && name;

const createUser = async (email, password, name, next) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashedPassword, name });
  const [err] = await to(user.save());
  if (err) next(new ErrorHandler(err));

  next({ data: 'User registered!' });
};

module.exports = async (req, _res, next) => {
  const { email, password, name } = req.body;

  if (!checkEmailAndPassword(email, password, name)) {
    next(new ErrorHandler('Username/Password not found', 200));
  }

  const [err, userExists] = await to(User.findOne({ email }));
  if (err) next(new ErrorHandler(err));

  if (!userExists) {
    createUser(email, password, name, next);
  } else {
    next(new ErrorHandler('A user with this email already exists', 200));
  }
};
