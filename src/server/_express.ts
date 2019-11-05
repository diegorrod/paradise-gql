import express from 'express';
import cookieParser from 'cookie-parser';

// Preparo Express
export const app = express();
app.use(cookieParser());

export default {
  app,
};
