import { useState } from 'react'
import { PlusIcon, Beaker, FileText, ClipboardList } from 'lucide-react'
import { QuickActionButton } from './QuickActionButton'
import { usePractitionerStore } from '@/store/practitioner-store'
import { AddAllergyDialog } from './AddAllergyDialog'
import { CreateLabOrderDialog } from './CreateLabOrderDialog'
import { WritePrescriptionDialog } from './WritePrescriptionDialog'
import { ReviewResultsDialog } from './ReviewResultsDialog'

export function QuickActions() {
    const selectedPatient = usePractitionerStore(state => state.selectedPatient)
    const [dialogOpen, setDialogOpen] = useState<'allergy' | 'labOrder' | 'prescription' | 'results' | null>(null)

    const actions = [
        {
            name: 'Add Allergy',
            icon: PlusIcon,
            description: 'Record a new allergy',
            bgColor: 'bg-[#1A1433]',
            dialogType: 'allergy' as const,
            disabled: !selectedPatient
        },
        {
            name: 'Create Lab Order',
            icon: Beaker,
            description: 'Order new laboratory tests',
            bgColor: 'bg-[#2A2443]',
            dialogType: 'labOrder' as const,
            disabled: !selectedPatient
        },
        {
            name: 'Write Prescription',
            icon: FileText,
            description: 'Prescribe medications',
            bgColor: 'bg-[#382F57]',
            dialogType: 'prescription' as const,
            disabled: !selectedPatient
        },
        {
            name: 'Review Results',
            icon: ClipboardList,
            description: 'Check pending lab results',
            bgColor: 'bg-[#463A6B]',
            dialogType: 'results' as const,
            disabled: !selectedPatient
        },
    ]

    return (
        <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action) => (
                    <QuickActionButton
                        key={action.name}
                        name={action.name}
                        icon={action.icon}
                        description={action.disabled ? 'Select a patient first' : action.description}
                        bgColor={action.disabled ? 'bg-gray-400' : action.bgColor}
                        onClick={() => setDialogOpen(action.dialogType)}
                    />
                ))}
            </div>

            {selectedPatient && (
                <>
                    <AddAllergyDialog
                        open={dialogOpen === 'allergy'}
                        onClose={() => setDialogOpen(null)}
                        patientId={selectedPatient.id}
                    />
                    <CreateLabOrderDialog
                        open={dialogOpen === 'labOrder'}
                        onClose={() => setDialogOpen(null)}
                        patientId={selectedPatient.id}
                    />
                    <WritePrescriptionDialog
                        open={dialogOpen === 'prescription'}
                        onClose={() => setDialogOpen(null)}
                        patientId={selectedPatient.id}
                    />
                    <ReviewResultsDialog
                        open={dialogOpen === 'results'}
                        onClose={() => setDialogOpen(null)}
                        patientId={selectedPatient.id}
                    />
                </>
            )}
        </div>
    )
}