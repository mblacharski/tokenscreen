import { Token } from "@prisma/client";
import prisma from "../db-client";

class TokenManager {
    #db = prisma

    async getAll() {
        try {
            const allTokens = await this.#db.token.findMany()
            if(!allTokens) {
                return []
            }
            return allTokens
        } catch (e) {
            console.error(e)
        }
        return []
    }

    async getSingle(tokenId: number) {
        try {
            return this.#db.token.findUnique({
                where: {
                    id: tokenId
                }
            })
        } catch (e) {
            console.error(e)
        }
        return null
    }

    async add(token: Token) {
        try {
            const created = await this.#db.token.create({
                data: token
            })
            return created
        } catch (e) {
            console.error(e)
        }
        return null
    }

    async remove(tokenId: number) {
        try {
            const deleted = await this.#db.token.delete({
                where: {
                    id: tokenId
                }
            })
            return deleted
        } catch (e) {
            console.error(e)
        }
        return null
    }
}

export default new TokenManager()
