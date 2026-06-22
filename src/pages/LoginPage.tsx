import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserIcon, LockIcon, EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/constants/routes'

export const LoginPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { login, isLoading } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const redirectTo = searchParams.get('redirect') ?? ROUTES.HOME

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (values: LoginFormValues) => {
        setError(null)
        try {
            await login(values)
            navigate(redirectTo, { replace: true })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login gagal, coba lagi.')
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6">

                {/* Header */}
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Login untuk mengakses semua fitur
                    </p>
                </div>

                {/* Card */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base">Login</CardTitle>
                        <CardDescription className="text-xs">
                            Gunakan akun dummyjson:
                            <span className="font-mono text-foreground"> emilys / emilyspass</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Username */}
                            <div className="space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <UserIcon
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <Input
                                        id="username"
                                        placeholder="emilys"
                                        className="pl-9"
                                        autoComplete="username"
                                        aria-invalid={!!errors.username}
                                        {...register('username')}
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-xs text-destructive">{errors.username.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <LockIcon
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="pl-9 pr-9"
                                        autoComplete="current-password"
                                        aria-invalid={!!errors.password}
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        onClick={() => setShowPassword(p => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword
                                            ? <EyeSlashIcon size={16} />
                                            : <EyeIcon size={16} />
                                        }
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-destructive">{errors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

                {/* Back */}
                <p className="text-center text-sm text-muted-foreground">
                    <Button
                        onClick={() => navigate(ROUTES.HOME)}
                        variant="ghost"
                    >
                        Kembali ke Home
                    </Button>
                </p>

            </div>
        </div>
    )
}