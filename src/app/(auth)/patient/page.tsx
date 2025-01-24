// src/app/(dashboard)/patient/page.tsx
'use client'

import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Patient } from '@/types'
import { CalendarDays, Pill, TestTube, AlertCircle } from 'lucide-react'

export default function PatientDashboard() {
    const { user } = useAuthStore()
    // We'll need to fetch the patient's data here
    const patientData: Patient | null = null // Replace with actual data fetching

    if (!patientData) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-6">
            {/* Header with Welcome Message */}
            <div>
                <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
                <p className="text-muted-foreground">View your medical history and records</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                        <Pill className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {patientData.prescriptions.filter(p => p.status === 'active').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Lab Orders</CardTitle>
                        <TestTube className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {patientData.labOrders.filter(l => l.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Known Allergies</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {patientData.allergies.length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Records */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Allergies */}
                <Card>
                    <CardHeader>
                        <CardTitle>Allergies</CardTitle>
                        <CardDescription>Known allergies and reactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {patientData?.allergies.map(allergy => (
                                <li key={allergy.id} className="flex items-center space-x-4">
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <div>
                                        <p className="font-medium">{allergy.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Severity: {allergy.severity}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Lab Orders & Results */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lab Orders & Results</CardTitle>
                        <CardDescription>Recent laboratory tests and results</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {patientData?.labOrders.map(order => (
                                <li key={order.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{order.testName}</p>
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    {order.results && (
                                        <div className="text-sm text-muted-foreground">
                                            Result: {order.results.value}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Prescriptions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Prescriptions</CardTitle>
                        <CardDescription>Current and past medications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {patientData?.prescriptions.map(prescription => (
                                <li key={prescription.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">{prescription.medicationName}</p>
                                        <span className={`px-2 py-1 rounded-full text-xs ${prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                            }`}>
                                            {prescription.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {prescription.dosage} - {prescription.frequency}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}