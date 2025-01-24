'use client'

import { useEffect } from 'react'
import { usePractitionerStore } from '@/store/practitioner-store'
import { useAuthStore } from '@/store/auth-store'
import { Stats } from './Stats'
import { QuickActions } from './QuickActions'
import { RecentPatients } from './RecentPatients'
import { ActivityTimeline } from './ActivityTimeline'
import { PatientRecords } from './PatientRecords'
import { useToast } from "@/hooks/use-toast"

export default function PractitionerDashboard() {
    const { user } = useAuthStore()
    const {
        patients,
        selectedPatient,
        patientSummary,
        medicalRecords,
        fetchPatients,
        fetchPatientSummary,
        fetchMedicalRecords,
        selectPatient,
        isLoading,
        error
    } = usePractitionerStore()

    const { toast } = useToast()

    // Fetch patients and summary on mount
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([fetchPatients(), fetchPatientSummary()])
                toast({
                    title: "Dashboard ready",
                    description: "Successfully loaded patient data",
                })
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load dashboard data. Please refresh the page.",
                })
            }
        }

        loadInitialData()
    }, [fetchPatients, fetchPatientSummary, toast])

    // Handle patient selection
    const handlePatientSelect = async (patientId: string) => {
        try {
            selectPatient(patientId)
            await fetchMedicalRecords(patientId)

            const patient = patients.find(p => p.id === patientId)
            toast({
                title: "Records loaded",
                description: `Successfully loaded medical records for ${patient?.user.firstName} ${patient?.user.lastName}`,
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load patient records. Please try again.",
            })
        }
    }

    if (error) {
        return (
            <div className="p-4 text-red-600 bg-red-50 rounded-md">
                <p>Error: {error}</p>
                <button
                    onClick={() => {
                        fetchPatients()
                        fetchPatientSummary()
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
                    Welcome back, {user?.title ? `${user.title} ` : 'Dr. '}{user?.lastName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Here's what's happening with your patients today.
                </p>
            </div>

            {/* Stats Overview */}
            <Stats
                patientSummary={{
                    totalPatients: patients.length,
                    pendingLabOrders: patientSummary?.statistics?.pendingLabOrders || 0,
                    resultsToReview: patientSummary?.statistics?.recentResults || 0,
                    activePrescriptions: patientSummary?.statistics?.activePrescriptions || 0
                }}
            />

            {/* Quick Actions */}
            <QuickActions />

            {/* Patient Management Section */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    {/* Patient Records */}
                    <PatientRecords
                        patients={patients}
                        selectedPatient={selectedPatient}
                        medicalRecords={medicalRecords}
                        onSelectPatient={handlePatientSelect}
                    />

                    {/* Recent Patients */}
                    <RecentPatients
                        patients={patients.slice(0, 5)}
                        onSelectPatient={handlePatientSelect}
                    />
                </div>

                {/* Activity Timeline */}
                <div>
                    <ActivityTimeline
                        activities={patientSummary?.recentActivities || []}
                        isLoading={isLoading}
                        error={error}
                        onRetry={() => fetchPatientSummary()}
                    />
                </div>
            </div>
        </div>
    )
}