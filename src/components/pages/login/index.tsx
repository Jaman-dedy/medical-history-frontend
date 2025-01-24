// src/components/pages/login/index.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import Image from 'next/image'

export default function LoginPage() {
    const router = useRouter()
    const { login, isLoading, error, user } = useAuthStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (user) {
            router.push(`/${user.role}/`)
        }
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login({ email, password })
    }

    return (
        <div className="min-h-screen">
            <div className="flex min-h-screen">
                {/* Left side - Login Form */}
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1A1433]">eFiche</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Medical History Management System
                            </p>
                        </div>

                        <div className="mt-8">
                            <div className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#1A1433] focus:outline-none focus:ring-[#1A1433] sm:text-sm"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#1A1433] focus:outline-none focus:ring-[#1A1433] sm:text-sm"
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="rounded-md bg-red-50 p-4">
                                            <div className="text-sm text-red-700">{error}</div>
                                        </div>
                                    )}

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex w-full justify-center rounded-md border border-transparent bg-[#1A1433] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#2A2443] focus:outline-none focus:ring-2 focus:ring-[#1A1433] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Signing in...' : 'Sign in'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">Demo accounts</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className="rounded-md border border-gray-300 bg-white py-2 px-3">
                                        <p className="text-sm font-medium text-[#1A1433]">Practitioner</p>
                                        <p className="text-xs text-gray-500">Email: doc1@example.com</p>
                                        <p className="text-xs text-gray-500">Password: pass123</p>
                                    </div>
                                    <div className="rounded-md border border-gray-300 bg-white py-2 px-3">
                                        <p className="text-sm font-medium text-[#1A1433]">Patient</p>
                                        <p className="text-xs text-gray-500">Email: patient1@example.com</p>
                                        <p className="text-xs text-gray-500">Password: pass123</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="relative hidden w-0 flex-1 lg:block">
                    <Image
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/assets/medical-login.svg"
                        alt="Medical office"
                        fill
                        priority
                    />
                </div>
            </div>
        </div>
    )
}