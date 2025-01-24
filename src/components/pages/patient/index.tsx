// src/app/patient/page.tsx
'use client'

import { useEffect } from 'react'
import { Stats } from './Stats'
import { MedicalOverview } from './MedicalOverview'
import { MedicalTimeline } from './MedicalTimeline'

export default function PatientDashboard() {
    // Dummy user data
    const user = {
        firstName: 'John',
        lastName: 'Doe'
    }

    // Dummy medical records
    const medicalRecords = {
        summary: {
            totalAllergies: 2,
            activePrescriptions: 3,
            pendingLabResults: 1,
            lastUpdateDays: 2
        },
        allergies: [
            {
                id: '1',
                name: 'Penicillin',
                severity: 'High',
                reaction: 'Rash and difficulty breathing',
                notes: 'Avoid all penicillin-based antibiotics',
                recordedAt: '2024-01-20T09:00:00Z'
            },
            {
                id: '2',
                name: 'Peanuts',
                severity: 'Medium',
                reaction: 'Hives',
                notes: 'Avoid all peanut products',
                recordedAt: '2024-01-15T14:30:00Z'
            }
        ],
        prescriptions: [
            {
                id: '1',
                medication: 'Amoxicillin',
                dosage: '500mg',
                frequency: 'Twice daily',
                startDate: '2024-01-24',
                endDate: '2024-01-31',
                isActive: true,
                instructions: 'Take with food',
                notes: 'For throat infection'
            },
            {
                id: '2',
                medication: 'Ibuprofen',
                dosage: '400mg',
                frequency: 'As needed',
                startDate: '2024-01-22',
                isActive: true,
                instructions: 'Take for pain',
                notes: 'Maximum 4 times per day'
            }
        ],
        labOrders: [
            {
                id: '1',
                testType: 'Blood Test',
                status: 'completed',
                instructions: 'Fasting required',
                orderedAt: '2024-01-20T10:00:00Z',
                results: [{
                    id: '1',
                    status: 'normal',
                    data: {
                        unit: 'mg/dL',
                        value: '120'
                    },
                    interpretation: 'Within normal range',
                    performedBy: 'Dr. Smith',
                    resultDate: '2024-01-22T14:00:00Z'
                }]
            },
            {
                id: '2',
                testType: 'Chest X-Ray',
                status: 'pending',
                instructions: 'Routine checkup',
                orderedAt: '2024-01-23T15:00:00Z'
            }
        ]
    }

    return (
        <div className="min-h-full">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back, {user.firstName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Here's an overview of your medical records.
                </p>
            </div>

            {/* Stats Overview */}
            <Stats summary={medicalRecords.summary} />

            {/* Medical Overview */}
            <MedicalOverview />

            {/* Medical Records Section */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    {/* Allergies Section */}
                    <section className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Current Allergies</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="space-y-4">
                                {medicalRecords.allergies.map((allergy) => (
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
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                {allergy.severity}
                                            </span>
                                        </div>
                                    </div>
                                ))}
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
                                {medicalRecords.prescriptions.map((prescription) => (
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
                                {medicalRecords.labOrders.map((order) => (
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
                    <MedicalTimeline />
                </div>
            </div>
        </div>)
}