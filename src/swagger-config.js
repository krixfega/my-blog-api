const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const app = express();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // or '2.0'
    info: {
      title: 'My Blog API',
      version: '1.0.0',
      description: 'API documentation for My Blog',
    },
  },
  // Paths to files with API routes
  apis: ['routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
