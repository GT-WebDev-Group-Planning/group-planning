const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
    name: String,
    code: String,
    description: String,
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
