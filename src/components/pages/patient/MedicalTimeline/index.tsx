// src/components/patient/MedicalTimeline.tsx
import { PillIcon, TestTubeIcon, ShieldAlertIcon } from 'lucide-react'

interface TimelineUpdate {
    type: 'prescription' | 'labOrder' | 'allergy'
    id: string
    medication?: string
    testType?: string
    name?: string
    prescribedAt?: string
    orderedAt?: string
    recordedAt?: string
    dosage?: string
    frequency?: string
    status?: string
}

interface MedicalTimelineProps {
    updates: TimelineUpdate[]
}

export function MedicalTimeline({ updates }: MedicalTimelineProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'prescription':
                return PillIcon
            case 'labOrder':
                return TestTubeIcon
            case 'allergy':
                return ShieldAlertIcon
            default:
                return PillIcon
        }
    }

    const getColor = (type: string) => {
        switch (type) {
            case 'prescription':
                return 'text-blue-600 bg-blue-100'
            case 'labOrder':
                return 'text-purple-600 bg-purple-100'
            case 'allergy':
                return 'text-red-600 bg-red-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
    }

    const getUpdateDate = (update: TimelineUpdate) => {
        return update.prescribedAt || update.orderedAt || update.recordedAt || new Date().toISOString()
    }

    const getUpdateTitle = (update: TimelineUpdate) => {
        switch (update.type) {
            case 'prescription':
                return `${update.medication} ${update.dosage ? `- ${update.dosage}` : ''}`
            case 'labOrder':
                return update.testType
            case 'allergy':
                return update.name
            default:
                return ''
        }
    }

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Updates</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <div className="flow-root">
                    <ul role="list" className="-mb-8">
                        {updates.map((update, idx) => {
                            const Icon = getIcon(update.type)
                            const colorClass = getColor(update.type)
                            const updateDate = getUpdateDate(update)

                            return (
                                <li key={update.id}>
                                    <div className="relative pb-8">
                                        {idx !== updates.length - 1 && (
                                            <span
                                                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div className="relative flex items-start space-x-3">
                                            <div className={`relative ${colorClass} p-2 rounded-full`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {getUpdateTitle(update)}
                                                    </div>
                                                    <p className="mt-0.5 text-sm text-gray-500">
                                                        {update.status}
                                                    </p>
                                                </div>
                                                <div className="mt-2 text-sm text-gray-500">
                                                    {new Date(updateDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}