import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/users', userRoutes);

    return app;
}