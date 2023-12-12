import dotenv from 'dotenv';
dotenv.config();

export const prodConfig = {
    secrets: {
      jwt: process.env.JWT_SECRET,
      jwtExp: process.env.JWT_EXPIRY
    },
    dbUrl: process.env.MONGO_URI,
    dbName: 'inventory-management-system'
}