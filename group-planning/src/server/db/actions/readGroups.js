const connectDB = require("../connect.js");
const User = require("../models/User.js");
require('dotenv').config({ path: '.env.local' });

async function readGroups(email, res) {
  await connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user.groups;
  } catch (error) {
    console.error('Error reading groups:', error);
    return null;
  }
}

module.exports = readGroups;
