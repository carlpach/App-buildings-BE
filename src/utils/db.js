const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL);
        const {name, host} = db.connection;
        console.log(`Connecting to ${name} DB in ${host}`);
    } catch (error) {
        console.log('Error connecting to DB', error);
        
    }
}

module.exports = { connect };