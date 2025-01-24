// src/components/pages/dashboard/DashboardPage.tsx
'use client'

import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Users,
    FileText,
    TestTube,
    Clock,
    AlertCircle
} from 'lucide-react'

export default function DashboardPage() {
    const { user } = useAuthStore()
    const isPractitioner = user?.role === 'practitioner'

    if (isPractitioner) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Practitioner Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full flex items-center gap-2" variant="outline">
                                <Users className="h-4 w-4" />
                                View Patients
                            </Button>
                            <Button className="w-full flex items-center gap-2" variant="outline">
                                <TestTube className="h-4 w-4" />
                                New Lab Order
                            </Button>
                            <Button className="w-full flex items-center gap-2" variant="outline">
                                <FileText className="h-4 w-4" />
                                Write Prescription
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Lab Results Ready</p>
                                        <p className="text-xs text-gray-500">Patient: John Doe</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Prescription Updated</p>
                                        <p className="text-xs text-gray-500">Patient: Jane Smith</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Total Patients</dt>
                                    <dd className="text-3xl font-semibold">24</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Pending Lab Orders</dt>
                                    <dd className="text-3xl font-semibold">8</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Active Prescriptions</dt>
                                    <dd className="text-3xl font-semibold">12</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Medical History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Medical History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Allergies</span>
                            <span className="text-sm text-gray-500">3 Records</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Lab Results</span>
                            <span className="text-sm text-gray-500">2 Pending</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Prescriptions</span>
                            <span className="text-sm text-gray-500">1 Active</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Tests */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <TestTube className="h-4 w-4 text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium">Blood Test</p>
                                    <p className="text-xs text-gray-500">Scheduled for: Tomorrow</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Prescriptions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Prescriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium">Amoxicillin</p>
                                    <p className="text-xs text-gray-500">3 times daily</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}