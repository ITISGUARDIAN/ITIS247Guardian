// ITIS Production OpenAPI 3.0 Documentation Specification
export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'ITIS National Platform API',
    version: '1.0.0',
    description: 'Republic of South Africa Integrated Technology & Intelligence System Production REST APIs'
  },
  servers: [
    { url: 'https://api.itis.gov.za/v1', description: 'Production SITA Cloud Enclave' },
    { url: 'http://localhost:3000/api/v1', description: 'Local Development Instance' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/auth/login': {
      post: {
        summary: 'Authenticate User with RSA ID / Email',
        responses: {
          '200': { description: 'JWT Access & Refresh Token granted' },
          '401': { description: 'Invalid Credentials' }
        }
      }
    },
    '/learners': {
      get: {
        summary: 'List Registered Learners',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'Learner array returned' } }
      }
    },
    '/incidents/trigger-sos': {
      post: {
        summary: 'Trigger Panic SOS Alert to SAPS & C3 Command',
        security: [{ bearerAuth: [] }],
        responses: { '201': { description: 'Emergency unit dispatched' } }
      }
    }
  }
};
