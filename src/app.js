import 'dotenv/config';
import express from 'express';
import TestUserRoutes from './routers/testUserRouter';
import userRoutes from './routers/userRoutes';
import travelRoute  from './routers/travelRoute';
import parcelRoute from './routers/parcelRoute';
const app = express();
const BASE_URL = process.env.BASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_, res) => 
res.status(200).json({ message: 'Welcome to shypment API server' })
);
app.use(`${BASE_URL}/testUser`, TestUserRoutes);
app.use(`${BASE_URL}/user`, userRoutes);
app.use(`${BASE_URL}/travel_information`, travelRoute);
app.use(`${BASE_URL}/parcelRequested`, parcelRoute);

module.exports = app;