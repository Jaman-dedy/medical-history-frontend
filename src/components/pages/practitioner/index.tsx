// src/app/practitioner/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { usePractitionerStore } from '@/store/practitioner-store'
import { useAuthStore } from '@/store/auth-store'
import { Stats } from './Stats'
import { QuickActions } from './QuickActions'
import { RecentPatients } from './RecentPatients'
import { ActivityTimeline } from './ActivityTimeline'
import { PatientRecords } from './PatientRecords'

// Add types for activities from the summary endpoint
interface Activity {
    type: string
    date: string
    description: string
}

export default function PractitionerDashboard() {
    const { user } = useAuthStore()
    const {
        patients,
        selectedPatient,
        patientSummary,
        fetchPatients,
        fetchPatientSummary,
        selectPatient,
        isLoading,
        error
    } = usePractitionerStore()

    useEffect(() => {
        fetchPatients()
        fetchPatientSummary()
    }, [fetchPatients, fetchPatientSummary])

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
                        onSelectPatient={selectPatient}
                    />

                    {/* Recent Patients */}
                    <RecentPatients
                        patients={patients.slice(0, 5)}
                        onSelectPatient={selectPatient}
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