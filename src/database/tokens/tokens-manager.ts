import { Token } from "@prisma/client";
import prisma from "../db-client";
import { PatchTokenBody, UpdateTokenBody } from "../../interfaces/token.interface";
import { DBActionResponse } from "../../interfaces/database.interface";
import { CommonErrors, createApiError, createApiSuccess, getIdOrError } from "../../lib/api/api-helpers"

/* 
    Note: All of the errors can be adjusted depending on the business requirements.
*/

/**
 * TokenManager utility class for tokens management in the database
 * @author Marcin Blacharski
 */
class TokenManager {
    #db = prisma

    /**
     * Queries the database for all tokens available.
     * @returns List of all available tokens.
     */
    async getAll(): Promise<DBActionResponse<Token[] | null>> {
        try {
            const allTokens = await this.#db.token.findMany()
            if(allTokens) {
                return createApiSuccess(allTokens)
            }
        } catch (e) {
            console.error(e)
            return CommonErrors.INTERNAL
        }
        return createApiSuccess([])
    }

    /**
     * Queries the database for single token by ID.
     * @param idParam ID of the token
     * @returns Queried token data or null.
     */
    async getSingle(idParam: string | number): Promise<DBActionResponse<Token | null>> {
        const {id, idError} = getIdOrError(idParam)
        if(idError) {
            return idError
        }
        try {
            const data = await this.#db.token.findUnique({
                where: {
                    id
                }
            }) 
            if(data) {
                return createApiSuccess(data)
            }
        } catch (e: any) {
            console.error(e)
        }
        return CommonErrors.OBJECT_NOT_FOUND
    }

    /**
     * Saves the token to the database.
     * @param token Token data to be saved to database.
     * @returns Created token on success or null on fail.
     */
    async add(token: Token): Promise<DBActionResponse<Token | null>> {
        if(!token) {
            return CommonErrors.MISSING_DATA
        }
        try {
            const created = await this.#db.token.create({
                data: token
            })
            if(created) {
                return createApiSuccess(created, 201)
            }
        } catch (e: any) {
            console.error(e)
            // This is how to catch specific DB errors from prisma library
            // When catching multiple errors, it's better to use switch, of course.
            if(e.name === 'PrismaClientValidationError') {
                return CommonErrors.BAD_REQUEST
            }
        }
        return CommonErrors.INTERNAL // or any other needed, depending on requirements and agreements with other teams
    }

    /**
     * Updates the token in the database.
     * @param idParam ID of the token to be updated.
     * @param token Full token data (except ID) to be updated.
     * @returns Updated token on success or null on fail.
     */
    async update(idParam: string | number, token: UpdateTokenBody): Promise<DBActionResponse<Token | null>> {
        const {id, idError} = getIdOrError(idParam)
        if(idError) {
            return idError
        }
        if(!token) {
            return CommonErrors.MISSING_DATA
        }
        const { name, ticker, description } = token
        if(!(name && ticker && description)) {
            return CommonErrors.INCOMPLETE_BODY
        }
        try {
            const updated = await this.#db.token.update({
                where: {
                    id
                },
                data: token
            })
            if(updated) {
                return createApiSuccess(updated)
            }
            return CommonErrors.BAD_REQUEST
        } catch (e: any) {
            console.error(e)
            // Another example of specific error handling
            if(e.code === 'P2025') {
                return CommonErrors.OBJECT_NOT_FOUND
            }
        }
        return CommonErrors.INTERNAL
    }

    /**
     * Updates the token in the database.
     * @param idParam ID of the token to be updated.
     * @param token Partial token data (except ID) to be updated.
     * @returns Updated token on success or null on fail.
     */
    async patch(idParam: string | number, token: PatchTokenBody): Promise<DBActionResponse<Token | null>> {
        const {id, idError} = getIdOrError(idParam)
        if(idError) {
            return idError
        }
        if(!token) {
            return CommonErrors.MISSING_DATA
        }
        try {
            const updated = await this.#db.token.update({
                where: {
                    id
                },
                data: token
            })
            if(updated) {
                return createApiSuccess(updated)
            }
            return CommonErrors.BAD_REQUEST
        } catch (e: any) {
            console.error(e)
            if(e.code === 'P2025') {
                return CommonErrors.OBJECT_NOT_FOUND
            }
        }
        return CommonErrors.INTERNAL
    }

    /**
     * Deletes the token by ID.
     * @param idParam ID of the token to be deleted.
     * @returns Deleted token data on success or null on fail.
     */
    async delete(idParam: string | number): Promise<DBActionResponse<Token | null>> {
        const {id, idError} = getIdOrError(idParam)
        if(idError) {
            return idError
        }
        try {
            const deleted = await this.#db.token.delete({
                where: {
                    id
                }
            })
            if(deleted) {
                return createApiSuccess(deleted, 200)
            }
            return CommonErrors.BAD_REQUEST
        } catch (e: any) {
            console.error(e)
            if(e.code === 'P2025') {
                return CommonErrors.OBJECT_NOT_FOUND
            }
        }
        return CommonErrors.OBJECT_NOT_FOUND
    }
}

export default new TokenManager()
