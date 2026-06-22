import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from 'react'
import { authService } from '@/services/auth.service'
import type { AuthUser, AuthContextType } from '@/types/auth.types'
import type { LoginFormValues } from '@/schemas/auth.schema'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const login = useCallback(async (credentials: LoginFormValues) => {
        setIsLoading(true)
        try {
            const res = await authService.login(credentials)

            const { accessToken, refreshToken: _refresh, ...userData } = res

            setToken(accessToken)
            setUser(userData)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        setToken(null)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}