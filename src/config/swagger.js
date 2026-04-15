import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Netflim Auth API',
      version: '1.0.0',
      description: 'Authentication microservice for the Netflim platform',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            username: { type: 'string', example: 'emi_lim' },
            email: { type: 'string', example: 'emi@gmail.com' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        
        AuthResponse: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            accessToken: { 
              type: 'string', 
              description: 'JWT access token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
          },
        },

        VerifyResponse: {
          type: 'object',
          properties: {
            valid: { type: 'boolean', example: true },
            user: { 
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                username: { type: 'string' },
              },
            },
          },
        },

        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            details: { 
              type: 'array',
              items: { type: 'string' },
              description: 'Validation error details (optional)'
            },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        ServiceToken: {
          type: 'apiKey',
          in: 'header',
          name: 'x-service-token',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);