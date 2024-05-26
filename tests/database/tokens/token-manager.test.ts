import prisma from '../../../src/database/db-client';
import TokenManager from '../../../src/database/tokens/tokens-manager';
import { CommonErrors, createApiSuccess } from '../../../src/lib/api/api-helpers';
import { Token } from '@prisma/client';

// Mocking Prisma Client
jest.mock('../../../src/database/db-client', () => ({
    token: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}))

describe('TokenManager', () => {
    const mockToken: Token = {
        id: 1,
        name: 'Test Token',
        ticker: 'TT',
        description: 'Test Description'
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('getAll - success', async () => {
        (prisma.token.findMany as jest.Mock).mockResolvedValue([mockToken])
        const result = await TokenManager.getAll()
        expect(result).toEqual(createApiSuccess([mockToken]))
        expect(prisma.token.findMany).toHaveBeenCalledTimes(1)
    })

    test('getAll - failure', async () => {
        (prisma.token.findMany as jest.Mock).mockRejectedValue(new Error('Internal error'))
        const result = await TokenManager.getAll()
        expect(result).toEqual(CommonErrors.INTERNAL)
        expect(prisma.token.findMany).toHaveBeenCalledTimes(1)
    })

    test('getSingle - success', async () => {
        (prisma.token.findUnique as jest.Mock).mockResolvedValue(mockToken)
        const result = await TokenManager.getSingle(1)
        expect(result).toEqual(createApiSuccess(mockToken))
        expect(prisma.token.findUnique).toHaveBeenCalledTimes(1)
    })

    test('getSingle - invalid ID', async () => {
        const result = await TokenManager.getSingle('invalid')
        expect(result).toEqual(CommonErrors.INVALID_ID)
    })

    test('getSingle - not found', async () => {
        (prisma.token.findUnique as jest.Mock).mockResolvedValue(null)
        const result = await TokenManager.getSingle(1)
        expect(result).toEqual(CommonErrors.OBJECT_NOT_FOUND)
        expect(prisma.token.findUnique).toHaveBeenCalledTimes(1)
    })

    test('add - success', async () => {
        (prisma.token.create as jest.Mock).mockResolvedValue(mockToken)
        const result = await TokenManager.add(mockToken)
        expect(result).toEqual(createApiSuccess(mockToken, 201))
        expect(prisma.token.create).toHaveBeenCalledTimes(1)
    })

    test('add - missing data', async () => {
        const result = await TokenManager.add(null as any)
        expect(result).toEqual(CommonErrors.MISSING_DATA)
    })

    test('add - validation error', async () => {
        const error = new Error() as any
        error.name = 'PrismaClientValidationError';
        (prisma.token.create as jest.Mock).mockRejectedValue(error)
        const result = await TokenManager.add(mockToken)
        expect(result).toEqual(CommonErrors.BAD_REQUEST)
        expect(prisma.token.create).toHaveBeenCalledTimes(1)
    })

    test('update - success', async () => {
        (prisma.token.update as jest.Mock).mockResolvedValue(mockToken)
        const result = await TokenManager.update(1, mockToken)
        expect(result).toEqual(createApiSuccess(mockToken))
        expect(prisma.token.update).toHaveBeenCalledTimes(1)
    })

    test('update - invalid ID', async () => {
        const result = await TokenManager.update('invalid', mockToken)
        expect(result).toEqual(CommonErrors.INVALID_ID)
    })

    test('update - missing data', async () => {
        const result = await TokenManager.update(1, null as any)
        expect(result).toEqual(CommonErrors.MISSING_DATA)
    })

    test('update - incomplete body', async () => {
        const incompleteToken = { name: 'Test Token', ticker: 'TT' } // Missing description
        const result = await TokenManager.update(1, incompleteToken as any)
        expect(result).toEqual(CommonErrors.INCOMPLETE_BODY)
    })

    test('update - not found', async () => {
        const error = new Error() as any
        error.code = 'P2025';
        (prisma.token.update as jest.Mock).mockRejectedValue(error)
        const result = await TokenManager.update(1, mockToken)
        expect(result).toEqual(CommonErrors.OBJECT_NOT_FOUND)
        expect(prisma.token.update).toHaveBeenCalledTimes(1)
    })

    test('delete - success', async () => {
        (prisma.token.delete as jest.Mock).mockResolvedValue(mockToken)
        const result = await TokenManager.delete(1)
        expect(result).toEqual(createApiSuccess(mockToken, 200))
        expect(prisma.token.delete).toHaveBeenCalledTimes(1)
    })

    test('delete - invalid ID', async () => {
        const result = await TokenManager.delete('invalid')
        expect(result).toEqual(CommonErrors.INVALID_ID)
    })

    test('delete - not found', async () => {
        const error = new Error() as any
        error.code = 'P2025';
        (prisma.token.delete as jest.Mock).mockRejectedValue(error)
        const result = await TokenManager.delete(1)
        expect(result).toEqual(CommonErrors.OBJECT_NOT_FOUND)
        expect(prisma.token.delete).toHaveBeenCalledTimes(1)
    })
})
