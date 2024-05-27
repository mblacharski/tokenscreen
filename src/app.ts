import express from 'express';
import initializeRoutes from './routes-init';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
// PORT - for Heroku
// APP_SERVER_PORT_INNER - for Docker-Compose
// 80 - default
const port = process.env.PORT || process.env.APP_SERVER_PORT_INNER || 80

initializeRoutes(app)

app.listen(port, () => {
    console.log('Listening on port', port)
})
