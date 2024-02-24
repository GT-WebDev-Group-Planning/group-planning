const connectDB = require("../connect.js");
const User = require("../models/User.js");
require('dotenv').config({ path: '.env.local' });

async function createUser(userData, res) {
  await connectDB();
  try {
    const { email, name } = userData;
    if (await User.exists({ email: email })) {
      return true;
    }
    const groups = [];
    const events = [];
    const user = new User({ email, name, events, groups });
    await user.save();
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = createUser;