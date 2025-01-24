// src/components/auth/RoleGuard.tsx
'use client'

import { useAuthStore } from '@/store/auth-store'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function RoleGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!user) {
            router.push('/login')
            return
        }

        const basePath = `/${user.role}`
        // Redirect to role-specific dashboard if on wrong route
        if (!pathname.startsWith(basePath) && pathname !== '/login') {
            router.push(`${basePath}/dashboard`)
        }

    }, [user, pathname, router])

    // Show loading or null while checking authentication
    if (!user) {
        return null
    }

    return <>{children}</>
}