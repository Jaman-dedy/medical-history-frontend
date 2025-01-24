// src/components/dashboard/Stats.tsx
import { UsersIcon, BeakerIcon, ClipboardDocumentCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

interface StatsProps {
    patientSummary: {
        totalPatients: number
        pendingLabOrders: number
        resultsToReview: number
        activePrescriptions: number
    }
}

export function Stats({ patientSummary }: StatsProps) {
    const stats = [
        { name: 'Total Patients', value: patientSummary.totalPatients, icon: UsersIcon },
        { name: 'Pending Lab Orders', value: patientSummary.pendingLabOrders, icon: BeakerIcon },
        { name: 'Results to Review', value: patientSummary.resultsToReview, icon: ClipboardDocumentCheckIcon },
        { name: 'Active Prescriptions', value: patientSummary.activePrescriptions, icon: DocumentTextIcon },
    ]

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1A1433]/10">
                                <stat.icon className="h-6 w-6 text-[#1A1433]" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                                <dd className="mt-1 text-3xl font-semibold tracking-tight text-[#1A1433]">{stat.value}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}