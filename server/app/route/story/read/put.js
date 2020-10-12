const to = require('await-to-js').default;
const { ErrorHandler } = require('../../../../middlewares/error');
const Story = require('../../../models/Story');

module.exports = async (req, res, next) => {
  const { storyId } = req.params;
  const { userId } = res.locals;

  const [err, updateRead] = await to(
    Story.findOneAndUpdate(
      { _id: storyId },
      {
        $addToSet: { reads: userId },
      },
      { new: true }
    )
  );
  if (err) next(new ErrorHandler(err));
  next({ reads: updateRead.reads.length, storyId });
};
