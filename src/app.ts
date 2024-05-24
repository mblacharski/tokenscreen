import express from 'express';
import initializeRoutes from './routes-init';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.APP_SERVER_PORT_INNER

initializeRoutes(app)

app.listen(port, () => {
    console.log('Listening on port', port)
})
