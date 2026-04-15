import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { swaggerSpec } from './config/swagger.js';

// Middlewares d'erreur
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);

    // Middlewares d'erreur (TOUJOURS en dernier)
    app.use(notFound);
    app.use(errorHandler);

    return app;
}
