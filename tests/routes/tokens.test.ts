import request from 'supertest';
import express from 'express';
import tokensRoute from '../../src/routes/tokens';
import tokensManager from '../../src/database/tokens/tokens-manager';
import { createApiSuccess, CommonErrors } from '../../src/lib/api/api-helpers';
import { Token } from '@prisma/client';

jest.mock('../../src/database/tokens/tokens-manager')

const app = express()
app.use(express.json())
app.use('/tokens', tokensRoute)

describe('Tokens API', () => {
    const mockToken: Token = {
        id: 1,
        name: 'Test Token',
        ticker: 'TT',
        description: 'Test Description'
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('GET /tokens - success', async () => {
        (tokensManager.getAll as jest.Mock).mockResolvedValue(createApiSuccess([mockToken]))
        const response = await request(app).get('/tokens')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([mockToken])
    })

    test('GET /tokens - failure', async () => {
        (tokensManager.getAll as jest.Mock).mockResolvedValue(CommonErrors.INTERNAL)
        const response = await request(app).get('/tokens')
        expect(response.status).toBe(500)
    })

    test('GET /tokens/:id - success', async () => {
        (tokensManager.getSingle as jest.Mock).mockResolvedValue(createApiSuccess(mockToken))
        const response = await request(app).get('/tokens/1')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockToken)
    })

    test('GET /tokens/:id - invalid ID', async () => {
        (tokensManager.getSingle as jest.Mock).mockResolvedValue(CommonErrors.INVALID_ID)
        const response = await request(app).get('/tokens/invalid')
        expect(response.status).toBe(400)
    })

    test('GET /tokens/:id - not found', async () => {
        (tokensManager.getSingle as jest.Mock).mockResolvedValue(CommonErrors.OBJECT_NOT_FOUND)
        const response = await request(app).get('/tokens/999')
        expect(response.status).toBe(404)
    })

    test('POST /tokens - success', async () => {
        (tokensManager.add as jest.Mock).mockResolvedValue(createApiSuccess(mockToken, 201))
        const response = await request(app)
            .post('/tokens')
            .send(mockToken)
        expect(response.status).toBe(201)
        expect(response.body).toEqual(mockToken)
    })

    test('POST /tokens - missing data', async () => {
        (tokensManager.add as jest.Mock).mockResolvedValue(CommonErrors.MISSING_DATA)
        const response = await request(app)
            .post('/tokens')
            .send({})
        expect(response.status).toBe(400)
    })

    test('PUT /tokens/:id - success', async () => {
        (tokensManager.update as jest.Mock).mockResolvedValue(createApiSuccess(mockToken))
        const response = await request(app)
            .put('/tokens/1')
            .send(mockToken)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockToken)
    })

    test('PUT /tokens/:id - invalid ID', async () => {
        (tokensManager.update as jest.Mock).mockResolvedValue(CommonErrors.INVALID_ID)
        const response = await request(app)
            .put('/tokens/invalid')
            .send(mockToken)
        expect(response.status).toBe(400)
    })

    test('PUT /tokens/:id - incomplete body', async () => {
        const incompleteToken = { name: 'Test Token', ticker: 'TT' }; // Missing description
        (tokensManager.update as jest.Mock).mockResolvedValue(CommonErrors.INCOMPLETE_BODY)
        const response = await request(app)
            .put('/tokens/1')
            .send(incompleteToken)
        expect(response.status).toBe(400)
    })

    test('PUT /tokens/:id - not found', async () => {
        (tokensManager.update as jest.Mock).mockResolvedValue(CommonErrors.OBJECT_NOT_FOUND)
        const response = await request(app)
            .put('/tokens/1')
            .send(mockToken)
        expect(response.status).toBe(404)
    })

    test('PATCH /tokens/:id - success', async () => {
        (tokensManager.patch as jest.Mock).mockResolvedValue(createApiSuccess(mockToken))
        const response = await request(app)
            .patch('/tokens/1')
            .send({ name: 'Updated Token' })
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockToken)
    })

    test('PATCH /tokens/:id - invalid ID', async () => {
        (tokensManager.patch as jest.Mock).mockResolvedValue(CommonErrors.INVALID_ID)
        const response = await request(app)
            .patch('/tokens/invalid')
            .send({ name: 'Updated Token' })
        expect(response.status).toBe(400)
    })

    test('PATCH /tokens/:id - not found', async () => {
        (tokensManager.patch as jest.Mock).mockResolvedValue(CommonErrors.OBJECT_NOT_FOUND)
        const response = await request(app)
            .patch('/tokens/1')
            .send({ name: 'Updated Token' })
        expect(response.status).toBe(404)
    })

    test('DELETE /tokens/:id - success', async () => {
        (tokensManager.delete as jest.Mock).mockResolvedValue(createApiSuccess(mockToken, 200))
        const response = await request(app).delete('/tokens/1')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockToken)
    })

    test('DELETE /tokens/:id - invalid ID', async () => {
        (tokensManager.delete as jest.Mock).mockResolvedValue(CommonErrors.INVALID_ID)
        const response = await request(app).delete('/tokens/invalid')
        expect(response.status).toBe(400)
    })

    test('DELETE /tokens/:id - not found', async () => {
        (tokensManager.delete as jest.Mock).mockResolvedValue(CommonErrors.OBJECT_NOT_FOUND)
        const response = await request(app).delete('/tokens/999')
        expect(response.status).toBe(404)
    })
})
