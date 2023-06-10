import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import signUpRoute from './routes/signUpRoute.js';
import { connectDb, disconnectDb } from './config/database.js';
import signInRoute from './routes/signInRoute.js';

dotenv.config();

const app = express();

app 
  .use(cors())
  .use(json())
  .use('/health', (_req, res) => res.send('Hi!'))
  .use('/', signInRoute)
  .use('/signup', signUpRoute)
  

export function init() {
  connectDb();
  return Promise.resolve(app);
  }
  
export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;