// src/app/patient/page.tsx
'use client'

import { useEffect } from 'react'
import { usePatientStore } from '@/store/patient-store'
import { useToast } from "@/hooks/use-toast"
import { Stats } from './Stats'
import { MedicalOverview } from './MedicalOverview'
import { MedicalTimeline } from './MedicalTimeline'

export default function PatientDashboard() {
    const { toast } = useToast()
    const {
        profile,
        medicalRecords,
        isLoading,
        error,
        fetchProfile,
        fetchMedicalRecords
    } = usePatientStore()

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([fetchProfile(), fetchMedicalRecords()])
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load your medical records. Please try again.",
                })
            }
        }
        loadData()
    }, [fetchProfile, fetchMedicalRecords, toast])

    if (error) {
        return (
            <div className="p-4 text-red-600 bg-red-50 rounded-md">
                <p>Error: {error}</p>
                <button
                    onClick={() => {
                        fetchProfile()
                        fetchMedicalRecords()
                    }}
                    className="mt-2 text-sm text-red-700 hover:text-red-800"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className="min-h-full">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back, {profile?.firstName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Here's an overview of your medical records.
                </p>
            </div>

            {/* Stats Overview */}
            <Stats summary={{
                totalAllergies: medicalRecords?.summary.totalAllergies || 0,
                activePrescriptions: medicalRecords?.summary.activePrescriptions || 0,
                pendingLabResults: medicalRecords?.summary.pendingLabResults || 0
            }} />

            {/* Medical Overview */}
            <MedicalOverview />

            {/* Medical Records Section */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    {/* Allergies Section */}
                    {/* Allergies Section */}
                    <section className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Current Allergies</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-4">
                                {medicalRecords?.allergies.map((allergy) => (
                                    <div key={allergy.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">{allergy.name}</h4>
                                                <p className="mt-1 text-sm text-gray-500">Severity: {allergy.severity}</p>
                                                <p className="mt-1 text-sm text-gray-500">Reaction: {allergy.reaction}</p>
                                                {allergy.notes && (
                                                    <p className="mt-2 text-sm text-gray-500">{allergy.notes}</p>
                                                )}
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${allergy.severity === 'High'
                                                ? 'bg-red-100 text-red-800'
                                                : allergy.severity === 'Medium'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {allergy.severity}
                                            </span>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500">
                                            Recorded: {new Date(allergy.recordedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {medicalRecords?.allergies.length === 0 && (
                                    <div className="text-center py-4 text-gray-500">
                                        No allergies recorded
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Prescriptions Section */}
                    <section className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Active Medications</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-4">
                                {medicalRecords?.prescriptions.map((prescription) => (
                                    <div key={prescription.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">{prescription.medication}</h4>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {prescription.dosage} - {prescription.frequency}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">{prescription.instructions}</p>
                                                {prescription.notes && (
                                                    <p className="mt-2 text-sm text-gray-500">{prescription.notes}</p>
                                                )}
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prescription.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {prescription.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    {/* Lab Results Section */}
                    <section className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Lab Results</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-6">
                                {medicalRecords?.labOrders.map((order) => (
                                    <div key={order.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">{order.testType}</h4>
                                                <p className="mt-1 text-sm text-gray-500">{order.instructions}</p>
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        {order.results?.map((result) => (
                                            <div key={result.id} className="mt-4 bg-gray-50 rounded-lg p-4">
                                                <p className="text-sm text-gray-900">
                                                    Result: {result.data.value} {result.data.unit}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">{result.interpretation}</p>
                                                <p className="mt-1 text-sm text-gray-500">By: {result.performedBy}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Medical Timeline */}
                    <MedicalTimeline updates={medicalRecords?.recentUpdates || []} />
                </div>
            </div>
        </div>
    )
}