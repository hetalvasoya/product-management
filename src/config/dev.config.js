import dotenv from 'dotenv';

dotenv.config();

export const devConfig = {
    secrets: {
      jwt: process.env.JWT_SECRET_DEV,
      jwtExp: process.env.JWT_EXPIRY_DEV
    },
    dbUrl: process.env.MONGO_URI_DEV,
    dbName: 'inventory-management-system'
}