import { Response } from "express"
import { DBActionResponse } from "../../interfaces/database.interface"

export function createApiSuccess<T>(data: T, status: number = 200): DBActionResponse<T> {
    return {
        success: true,
        status,
        data
    }
}

export function createApiError(error: string, status: number = 500): DBActionResponse<null> {
    return {
        success: false,
        error,
        status
    }
}

export const CommonErrors: {[key: string]: DBActionResponse<null>} = {
    INTERNAL: createApiError('Internal server error', 500),
    BAD_REQUEST: createApiError('Bad request', 400),
    INVALID_ID: createApiError('Invalid ID', 400),
    MISSING_ID: createApiError('Missing ID', 400),
    MISSING_DATA: createApiError('Missing data', 400),
    INCOMPLETE_BODY: createApiError('Missing object properties', 400),
    OBJECT_NOT_FOUND: createApiError('Requested object not found', 404)
}

export function getIdFromString(idString: string) {
    const id = Number(idString)
    const valid = !Number.isNaN(id)

    return valid ? id : null
}

export function getIdOrError(idParam: string | number) {
    let id: number = NaN
    if(!idParam) {
        return {
            idError: CommonErrors.MISSING_ID
        }
    }
    if (typeof idParam === 'number') {
        id = idParam
    } if(typeof idParam === 'string') {
        id = Number(idParam)
    } 
    if(Number.isNaN(id)) {
        return {
            idError: CommonErrors.INVALID_ID
        }
    }
    return {
        id
    }
}

export function sendDBResponse<T>(result: DBActionResponse<T>, res: Response) {
    if(result.error) {
        res.status(result.status).json({error: result.error})
    } else {
        res.status(result.status).json(result.data)
    }
}
