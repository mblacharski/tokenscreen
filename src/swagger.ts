
import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv'

dotenv.config()

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Swagger Docs for interview API',
        description: 'Implementation of interview API'
    },
    servers: [
        {
            url: `${process.env.APP_SERVER_URL}:${process.env.APP_SERVER_PORT_INNER}`,
            description: 'Main API server'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {
            Token: {
                id: 'number',
                name: 'string',
                ticker: 'string',
                description: 'string'
            },
            CreateTokenRequest: {
                $name: 'string',
                $ticker: 'string',
                $description: 'string'
            },
            UpdateTokenRequest: {
                $name: 'string',
                $ticker: 'string',
                $description: 'string'
            },
            PatchTokenRequest: {
                name: 'string',
                ticker: 'string',
                description: 'string'
            },
            APIError: {
                error: 'string'
            }
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/routes-init.ts']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc)
