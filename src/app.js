import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/users', userRoutes);
    app.use('/auth', authRoutes);

    return app;
}