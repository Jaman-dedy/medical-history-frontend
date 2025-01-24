// src/components/dashboard/RecentPatients.tsx
import Link from 'next/link'
import { SearchPatientResult } from '@/types'

interface RecentPatientsProps {
    patients: SearchPatientResult[]
    onSelectPatient: (patientId: string) => void
}

export function RecentPatients({ patients, onSelectPatient }: RecentPatientsProps) {
    return (
        <div className="mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recent Patients</h2>
                <Link
                    href="/practitioner/patients"
                    className="text-sm font-medium text-[#1A1433] hover:text-[#2A2443]"
                >
                    View all patients
                </Link>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date of Birth
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Blood Type
                            </th>
                            <th className="relative px-6 py-3">
                                <span className="sr-only">View</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {patient.user.firstName} {patient.user.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {patient.user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {patient.bloodType || 'Not specified'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onSelectPatient(patient.id)}
                                        className="text-[#1A1433] hover:text-[#2A2443]"
                                    >
                                        View details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {patients.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No patients found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}