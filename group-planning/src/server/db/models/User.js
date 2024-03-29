const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    groups: [{
        name: String,
        code: String,
        description: String,
    }],
    events: [
      {
        start: Date,
        end: Date,
        timeZone: String,
        summary: String,
      },
    ],
})

module.exports = mongoose.model("User", userSchema)