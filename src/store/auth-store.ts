// src/stores/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: 'practitioner' | 'patient'
    profileId: string
}

interface LoginResponse {
    success: boolean
    message: string
    data: {
        user: User
        token: string
    }
}

interface AuthState {
    user: User | null
    token: string | null
    isLoading: boolean
    error: string | null
    login: (credentials: { email: string, password: string }) => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            login: async ({ email, password }) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    })

                    const data: LoginResponse = await response.json()

                    if (!data.success) {
                        throw new Error(data.message || 'Login failed')
                    }

                    set({
                        user: data.data.user,
                        token: data.data.token,
                        isLoading: false,
                        error: null
                    })
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Login failed',
                        isLoading: false
                    })
                    console.error('Login error:', error)
                }
            },
            logout: () => set({ user: null, token: null, error: null })
        }),
        {
            name: 'auth-storage',
        }
    )
)