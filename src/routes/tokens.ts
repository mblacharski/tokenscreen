import express, { Request } from 'express'
import tokensManager from '../database/tokens/tokens-manager'
import {PatchTokenBody, UpdateTokenBody} from '../interfaces/token.interface'
import { Token } from '@prisma/client'
import { sendDBResponse } from '../lib/api/api-helpers'
const router = express.Router()

interface CreateTokenRequest extends Request {
    body: Token
}

interface UpdateTokenRequest extends Request {
    body: UpdateTokenBody
}

interface PatchTokenRequest extends Request {
    body: PatchTokenBody
}


router.get('/', async (_req, res) => {
    /*
        #swagger.tags = ['Tokens']
        #swagger.summary = "Get a list of all tokens available"
        #swagger.responses[200] = {
            description: "List of all tokens available",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Token"
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        
    */
    const response = await tokensManager.getAll()
    sendDBResponse(response, res)
})

router.get('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Tokens']
        #swagger.summary = "Get single token by id (if available)"
        #swagger.responses[200] = {
            description: "Single token",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Token"
                    }
                }
            }
        }
        #swagger.responses[400] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        #swagger.responses[404] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        #swagger.responses[500] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
    */
    const response = await tokensManager.getSingle(req.params.id)
    sendDBResponse(response, res)
})

router.post('/', async (req: CreateTokenRequest, res) => {
    /*
        #swagger.tags = ['Tokens']
        #swagger.summary = "Create new token"
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/CreateTokenRequest"
                    }  
                }
            }
        } 
        #swagger.responses[201] = {
            description: "Created token",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Token"
                    }
                }
            }
        }
        #swagger.responses[400] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        #swagger.responses[500] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
    */
    const response = await tokensManager.add(req.body)
    sendDBResponse(response, res)
})

router.put('/:id', async (req: UpdateTokenRequest, res) => {
    /*
        #swagger.tags = ['Tokens']
        #swagger.summary = "Update token (if existing) with full body"
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UpdateTokenRequest"
                    }  
                }
            }
        } 
        #swagger.responses[200] = {
            description: "Updated token",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Token"
                    }
                }
            }
        }
        #swagger.responses[400] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        #swagger.responses[500] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
    */
    const response = await tokensManager.update(req.params.id, req.body)
    sendDBResponse(response, res)
})



router.patch('/:id', async (req: PatchTokenRequest, res) => {
    /*
        #swagger.tags = ['Tokens']
        #swagger.summary = "Update token (if existing) using partial data"
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/PatchTokenRequest"
                    }  
                }
            }
        } 
        #swagger.responses[200] = {
            description: "Updated token",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Token"
                    }
                }
            }
        }
        #swagger.responses[400] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        #swagger.responses[500] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
    */
    const response = await tokensManager.patch(req.params.id, req.body)
    sendDBResponse(response, res)
})

router.delete('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Tokens']
        #swagger.summary = "Delete token by id"
        #swagger.responses[200] = {
            description: "Deleted token",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Token"
                    }
                }
            }
        }
        #swagger.responses[404] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
        #swagger.responses[400] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/APIError"
                    }
                }
            }
        }
    */
    const response = await tokensManager.delete(req.params.id)
    sendDBResponse(response, res)
})

export default router
