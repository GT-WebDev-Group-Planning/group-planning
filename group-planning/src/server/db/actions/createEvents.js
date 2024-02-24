const connectDB = require("../connect.js");
const User = require("../models/User.js");
require('dotenv').config({ path: '.env.local' });

async function createEvents(eventsData, email, res) {
  await connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.events.push(...eventsData);
    await user.save();
    return true;
  } catch (error) {
    console.error('Error creating events:', error);
    return false;
  }
}

module.exports = createEvents;