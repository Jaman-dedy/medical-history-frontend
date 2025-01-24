'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import Image from 'next/image';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MedicalScene from './MedicaIllustration'
import { Eye, EyeOff } from "lucide-react"
import './styles.css'

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error, user } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (user) {
            router.push(`/${user.role}/`);
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Login Form */}
            <div className="w-[40%] flex flex-col justify-center px-12 bg-white">
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold tracking-tight text-primary">eFiche</h2>
                        <p className="text-lg text-muted-foreground">
                            Medical History Management System
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="h-11 pr-10"  // Added pr-10 for the icon space
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? 'Hide password' : 'Show password'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Signing in...
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>

                    <p className="text-sm text-center text-muted-foreground">
                        Secure • HIPAA Compliant • Privacy Focused
                    </p>
                </div>
            </div>

            {/* Right side - Animated Medical Scene */}
            <div className="w-[60%]">
                <MedicalScene />
            </div>

        </div>
    );
}