const connectDB = require("../connect.js");
const User = require("../models/User.js");
require('dotenv').config({ path: '.env.local' });

async function createUser(userData, res) {
  await connectDB();
  try {
    const { email, name } = userData;
    if (await User.exists({ email: email })) {
      const user = await User.findOne({ email: email });
      // update user to latest schema if not latest
      if (user.schema_version === undefined || user.schema_version === null || user.schema_version < 2) {
        user.schema_version = 2;
        await user.save();
      }
      return true;
    }
    const groups = [];
    const events = [];
    const user = new User({ email, name, events, groups });
    await user.save();
    return false;
  } catch (e) {
    return res.status(400).send("Unable to create a user. Invalid data");
  }
}

module.exports = createUser;