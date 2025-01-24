// src/components/patient/MedicalOverview/index.tsx
import { ShieldAlertIcon, TestTubeIcon, PillIcon, FileTextIcon } from 'lucide-react'

interface OverviewCardProps {
    title: string
    description: string
    icon: any
    bgColor: string
    onClick: () => void
}

function OverviewCard({ title, description, icon: Icon, bgColor, onClick }: OverviewCardProps) {
    return (
        <button
            onClick={onClick}
            className={`${bgColor} p-6 rounded-lg text-white hover:opacity-90 transition-opacity`}
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-1 text-sm opacity-90">{description}</p>
                </div>
            </div>
        </button>
    )
}

export function MedicalOverview() {
    const sections = [
        {
            title: 'Allergies',
            description: 'View your allergies and reactions',
            icon: ShieldAlertIcon,
            bgColor: 'bg-[#1A1433]'
        },
        {
            title: 'Lab Results',
            description: 'Check your test results',
            icon: TestTubeIcon,
            bgColor: 'bg-[#2A2443]'
        },
        {
            title: 'Medications',
            description: 'View current prescriptions',
            icon: PillIcon,
            bgColor: 'bg-[#382F57]'
        },
        {
            title: 'Documents',
            description: 'Access medical records',
            icon: FileTextIcon,
            bgColor: 'bg-[#463A6B]'
        }
    ]

    return (
        <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Medical Overview</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {sections.map((section) => (
                    <OverviewCard
                        key={section.title}
                        {...section}
                        onClick={() => console.log(`Clicked ${section.title}`)}
                    />
                ))}
            </div>
        </div>
    )
}