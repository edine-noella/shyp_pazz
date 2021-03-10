import 'dotenv/config';
import express from 'express';
import TestUserRoutes from './routers/testUserRouter';
import userRoutes from './routers/userRoutes';

const app = express();
const BASE_URL = process.env.BASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => 
res.status(200).json({ message: 'Welcome to shypment API server' })
);
app.use(`${BASE_URL}/testUser`, TestUserRoutes);
app.use(`${BASE_URL}/user`, userRoutes);


module.exports = app;