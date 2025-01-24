// src/components/patient/Stats.tsx
import { ShieldAlertIcon, PillIcon, TestTubeIcon, ClockIcon } from 'lucide-react'

interface StatsProps {
    summary: {
        totalAllergies: number
        activePrescriptions: number
        pendingLabResults: number
        lastUpdateDays?: number
    }
}

export function Stats({ summary }: StatsProps) {
    const stats = [
        { name: 'Active Allergies', value: summary.totalAllergies, icon: ShieldAlertIcon },
        { name: 'Current Medications', value: summary.activePrescriptions, icon: PillIcon },
        { name: 'Pending Lab Results', value: summary.pendingLabResults, icon: TestTubeIcon },
        { name: 'Days Since Update', value: summary.lastUpdateDays || 0, icon: ClockIcon },
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