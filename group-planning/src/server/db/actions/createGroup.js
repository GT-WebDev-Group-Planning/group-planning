const connectDB = require("../connect.js");
const User = require("../models/User.js");
require('dotenv').config({ path: '.env.local' });

async function joinGroup(groupData, email, res) {
  await connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.groups.push(groupData);
    await user.save();
    return true;
  } catch (error) {
    console.error('Error adding group:', error);
    return false;
  }
}

module.exports = joinGroup;