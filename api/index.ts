import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// Import app utama dari src/index.ts
// import app from '../src/index';

const app = new Hono().basePath("/api");

app.get("/", (c) => {
    return c.json({message:"hello from Hono"})
})

const handler =  handle(app);

export const GET = handler;
export const POST = handle;