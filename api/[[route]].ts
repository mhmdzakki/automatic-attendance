import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// Import app utama dari src/index.ts
import app from '../src/index';

export default handle(app);