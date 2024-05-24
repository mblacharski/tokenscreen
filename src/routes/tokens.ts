import express from 'express'
import tokensManager from '../database/tokens/tokens-manager'
const router = express.Router()

function getIdFromString(idString: string) {
    const id = Number(idString)
    const valid = !Number.isNaN(id)

    return valid ? id : null
}

router.get('/', async (_req, res) => {
    const allTokens = await tokensManager.getAll()
    res.json(allTokens)
})

router.get('/:id', async (req, res) => {
    try {
        const id = getIdFromString(req.params.id)
        if(id) {
            const singleToken = await tokensManager.getSingle(id)
            if(singleToken) {
                res.json(singleToken)
            } else {
                res.status(404).json({
                    error: 'Object not found'
                })
            }
        } else {
            res.status(400).json({
                error: 'Wrong `id` format'
            })
        }

    } catch (e) {
        res.status(500).json({
            // Message can be extended with e.message or some specific catches
            error: 'Something went wrong on the server side'
        })
    }
})

router.post('/', async (req, res) => {
    const added = await tokensManager.add(req.body)
    if(added) {
        res.status(201).json(added)
    } else {
        res.status(400).json({
            error: 'Bad request'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = getIdFromString(req.params.id)
    if(id) {
        const removed = await tokensManager.remove(id)
        if(removed) {
            res.json(removed)
        } else {
            res.status(404).json({
                error: 'Nothing to delete'
            })
        }
    } else {
        res.status(400).json({
            error: 'Wrong `id` format'
        })
    }
})

export default router
