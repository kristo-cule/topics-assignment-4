const Name = require('../models/name.model');

exports.createName = async (input) => {
  if (input) {
    const data = input;

    try {
      return await new Name({ name: data }).save();
    } catch (e) {
      throw Error(e);
    }
  } else {
    throw Error('No input identified. Try again!');
  }
};

exports.getNames = (input) => {
  if (input) {
    // Source: https://javascript.plainenglish.io/learn-to-use-regular-expressions-like-a-ninja-in-node-js-20cfb6806f26
    const ReInput = new RegExp(`^.*${input}`);

    return Name.find({ name: ReInput });
  }

  throw Error('No input to get names.');
};
