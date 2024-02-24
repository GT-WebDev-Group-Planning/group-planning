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
    const cleanEvents = eventsData.map(event => {
      return {
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        summary: event.summary,
        timeZone: event.end.timeZone,
      };
    });
    await User.updateOne({ email: email }, { $set: { events: cleanEvents } });
    return true;
  } catch (error) {
    console.error('Error creating events:', error);
    return false;
  }
}

module.exports = createEvents;