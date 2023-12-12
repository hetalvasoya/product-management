import mongoose from "mongoose";
import config from './config.js';

const connectDB = async (url = config.dbUrl, dbName = config.dbName) => {
    try {
        const conn = await mongoose.connect(`${url}/${dbName}`);
        console.log('\n MongoDB has been Initialized HOST: ', conn.connection.host, '\n Database: ', conn.connection.name);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

export { connectDB };