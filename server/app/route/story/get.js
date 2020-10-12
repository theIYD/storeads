const to = require('await-to-js').default;
const Story = require('../../models/Story');
const { ErrorHandler } = require('../../../middlewares/error');

const getStories = async (_req, _res, next) => {
  const [err, stories] = await to(
    Story.find({})
      .populate('userId', 'name -_id')
      .select('reads title content createdAt')
  );

  if (err) next(new ErrorHandler(err));
  next(stories);
};

const getStory = async (req, _res, next) => {
  const { storyId } = req.params;

  const [err, story] = await to(
    Story.findOne({ _id: storyId }).populate('userId', 'name -_id')
  );

  if (err) next(new ErrorHandler(err));
  next(story);
};

module.exports = { getStories, getStory };
