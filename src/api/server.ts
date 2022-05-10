// Imports
import express from "express";
import { router as postsRouter } from "./posts/posts-router";

// Express server instance
export const server = express()

// Middleware
server.use(express.json())
server.use('/api/posts', postsRouter)
