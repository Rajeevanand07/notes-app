require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database', error);
    }
};

module.exports = connectDB;