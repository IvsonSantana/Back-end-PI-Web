const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API do Portal do Aluno MedioTEC',
    version: '1.0.0',
    description: 'API do portal do MedioTEC',
  },
  servers: [
    {
      url: 'http://localhost:10000',
      description: 'Servidor de Desenvolvimento',
    },
    {
      url: 'https://back-end-pi-web.onrender.com', 
      description: 'Servidor de Produção',
    },
  
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api/doc-portal-aluno-medio-tec', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};