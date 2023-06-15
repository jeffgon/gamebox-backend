import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import signUpRoute from './routes/signUpRoute.js';
import { connectDb, disconnectDb } from './config/database.js';
import signInRoute from './routes/signInRoute.js';
import addRouter from './routes/addRoute.js';

const app = express();

app 
  .use(cors())
  .use(json())
  .use('/health', (_req, res) => res.send('Hi!'))
  .use('/signin', signInRoute)
  .use('/signup', signUpRoute)
  .use('/add', addRouter)
  

export function init() {
  connectDb();
  return Promise.resolve(app);
};
  
export async function close(): Promise<void> {
  await disconnectDb();
};

export default app;