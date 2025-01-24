import { LucideIcon } from 'lucide-react'

interface QuickActionButtonProps {
    name: string
    icon: LucideIcon
    description: string
    bgColor: string
    onClick: () => void
    disabled?: boolean
}

export function QuickActionButton({
    name,
    icon: Icon,
    description,
    bgColor,
    onClick,
    disabled = false
}: QuickActionButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative group rounded-lg p-6 ${bgColor} shadow-sm transition-all 
                      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:opacity-90'} 
                      w-full text-left`}
        >
            <div className="flex items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="ml-3 text-sm font-medium text-white">{name}</h3>
            </div>
            <p className="mt-2 text-sm text-white/80">{description}</p>
        </button>
    )
}