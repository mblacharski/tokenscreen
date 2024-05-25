export interface DBActionResponse<T> {
    success: boolean
    status: number
    data?: T | null
    error?: string
}
