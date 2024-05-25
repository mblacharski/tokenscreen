import express, { Express } from "express";
import tokens from './routes/tokens'
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "./swagger-output.json";


export default function initializeRoutes(app: Express) {
    if(!app) {
        console.error('No `app` provided! Cannot initialize routes')
        return
    }
    // secure API
    app.use(helmet())
    // default to JSON format
    app.use(express.json())

    // setup API docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

    // setup routes
    app.use('/tokens', tokens)
}

