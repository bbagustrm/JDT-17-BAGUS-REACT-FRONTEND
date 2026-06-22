import { AUTH_CONFIG } from '@/constants/auth'
import type { LoginResponse } from '@/types/auth.types'
import type { LoginFormValues } from '@/schemas/auth.schema'

const fetcher = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> => {
    const res = await fetch(`${AUTH_CONFIG.BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message ?? `Auth Error: ${res.status}`)
    }

    return res.json() as Promise<T>
}

export const authService = {
    login: (credentials: LoginFormValues) =>
        fetcher<LoginResponse>(AUTH_CONFIG.ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
                expiresInMins: 60,
            }),
        }),

    refreshToken: (token: string) =>
        fetcher<LoginResponse>(AUTH_CONFIG.ENDPOINTS.REFRESH, {
            method: 'POST',
            body: JSON.stringify({
                refreshToken: token,
                expiresInMins: 60,
            }),
        }),
}