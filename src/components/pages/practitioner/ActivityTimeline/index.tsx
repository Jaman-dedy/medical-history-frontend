// src/components/dashboard/ActivityTimeline.tsx
import {
    DocumentTextIcon,
    BeakerIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface Activity {
    type: string
    date: string
    description: string
}

interface ActivityTimelineProps {
    activities: Activity[]
    isLoading?: boolean
    error?: string | null
    onRetry?: () => void
}

export function ActivityTimeline({
    activities,
    isLoading = false,
    error = null,
    onRetry
}: ActivityTimelineProps) {
    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'prescription':
                return { Icon: DocumentTextIcon, bgColor: 'bg-green-500' }
            case 'lab order':
                return { Icon: BeakerIcon, bgColor: 'bg-purple-500' }
            case 'allergy':
                return { Icon: ExclamationTriangleIcon, bgColor: 'bg-red-500' }
            default:
                return { Icon: DocumentTextIcon, bgColor: 'bg-gray-500' }
        }
    }

    if (isLoading) {
        return (
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="mt-4 animate-pulse">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex space-x-3">
                                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="mt-4 p-4 bg-red-50 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-2 text-sm text-red-700 hover:text-red-800"
                        >
                            Retry
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 flow-root">
                <ul role="list" className="-mb-8">
                    {activities.map((activity, idx) => {
                        const { Icon, bgColor } = getIcon(activity.type)
                        const formattedDate = new Date(activity.date).toLocaleString()

                        return (
                            <li key={idx}>
                                <div className="relative pb-8">
                                    {idx !== activities.length - 1 && (
                                        <span
                                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <div className="relative flex space-x-3">
                                        <div>
                                            <span className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center`}>
                                                <Icon className="h-5 w-5 text-white" />
                                            </span>
                                        </div>
                                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    {activity.description}
                                                </p>
                                            </div>
                                            <div className="text-right text-sm text-gray-500 whitespace-nowrap">
                                                <time dateTime={activity.date}>{formattedDate}</time>
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
    )
}