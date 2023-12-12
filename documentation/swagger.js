import dotenv from 'dotenv';
dotenv.config();

const options = {
    openapi: null,          // Enable/Disable OpenAPI. By default is null
    language: 'en-US',         // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: true,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: true,       // Enable/Disable automatic query capture. By default is true
    autoBody: true         // Enable/Disable automatic body capture. By default is true
}

import swaggerAutogen from 'swagger-autogen';

const { HOST,  PORT } = process.env;

const doc = {
    info: {
      title: 'Inventory Management',
      description: 'Inventory Management Application',
    },
    host: `${HOST}:${PORT}`, // The hostname and port where your API is running.
    schemes: ['http'],
    basePath: '',
    securityDefinitions: {
        bearerAuth:	{
            type: "apiKey",
            in: "header",
            name: "authorization",
            scheme: "bearer",
            bearerFormat: "JWT"
        }
    },
    security: [{
        bearerAuth: []
    }],
    definitions: {}
};

// The file where the Swagger JSON output will be saved.
const outputFile = './documentation/swagger-output.json'; 

// An array of files that contain your Express.js routes.
const endpointsFiles = ['./src/app.js'];

// const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);