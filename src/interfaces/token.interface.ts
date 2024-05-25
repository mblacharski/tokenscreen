export interface UpdateTokenBody {
    name: string
    ticker: string
    description: string
}

export interface PatchTokenBody {
    name?: string
    ticker?: string
    description?: string
}
