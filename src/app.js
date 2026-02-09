import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import emailRoutes from './routes/email.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { swaggerSpec } from './config/swagger.js';

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/api/mail', emailRoutes);

    return app;
}