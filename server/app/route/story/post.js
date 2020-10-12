const to = require('await-to-js').default;
const { ErrorHandler } = require('../../../middlewares/error');
const Story = require('../../models/Story');

module.exports = async (req, res, next) => {
  const { userId } = res.locals;
  const { title, content } = req.body;

  let err;
  const newStory = new Story({ title, content, userId });
  [err, saveStory] = await to(newStory.save());
  if (err) next(new ErrorHandler(err));

  next({ message: 'Story created.', storyId: saveStory._id });
};
