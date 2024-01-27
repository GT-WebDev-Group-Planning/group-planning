const mongoose = require("mongoose")
require('dotenv').config({ path: '.env.local' });

async function connectDB() {
    if (mongoose.connections[0].readyState) return;

    await mongoose
        .connect(process.env.MONGO_DB, {
            dbName: process.env.DB_NAME,
        })
        .catch((e) => {
            console.error("Error connecting to database.");
            throw e;
        });
};

module.exports = connectDB;