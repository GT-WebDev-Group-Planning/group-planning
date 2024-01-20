const mongoose = require("mongoose")

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
        type: mongoose.Types.ObjectId, ref: 'Group'
    }],
    events: [{
        type: mongoose.Types.ObjectId, ref: 'Event'
    }]
})

module.exports = mongoose.model("User", userSchema)