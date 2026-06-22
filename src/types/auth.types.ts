export interface AuthUser {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
}

export interface LoginResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    accessToken: string
    refreshToken: string
}

export interface AuthContextType {
    user: AuthUser | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (credentials: LoginFormInput) => Promise<void>
    logout: () => void
}

export interface LoginFormInput {
    username: string
    password: string
}