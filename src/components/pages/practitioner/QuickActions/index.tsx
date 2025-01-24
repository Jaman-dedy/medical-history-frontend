// src/components/dashboard/QuickActions/index.tsx
import { useState } from 'react'
import { PlusIcon, Beaker, FileText, ClipboardList } from 'lucide-react'
import { QuickActionButton } from './QuickActionButton'
import { usePractitionerStore } from '@/store/practitioner-store'
import { AddAllergyDialog } from './AddAllergyDialog'
import { CreateLabOrderDialog } from './CreateLabOrderDialog'
import { WritePrescriptionDialog } from './WritePrescriptionDialog'
import { ReviewResultsDialog } from './ReviewResultsDialog'

export function QuickActions() {
    const defaultPatient = {
        id: '4b9fa0af-1782-4770-8374-5d8d9d9169fa',
        // Add other required fields based on your SearchPatientResult type
        dateOfBirth: '1990-01-01',
        bloodType: 'A+',
        user: {
            id: '1',
            email: 'test@test.com',
            firstName: 'Jane',
            lastName: 'Smith'
        }
    }

    // const selectedPatient = usePractitionerStore(state => state.selectedPatient)
    const selectedPatient = defaultPatient
    const [dialogOpen, setDialogOpen] = useState<'allergy' | 'labOrder' | 'prescription' | 'results' | null>(null)


    const actions = [
        {
            name: 'Add Allergy',
            icon: PlusIcon,
            description: 'Record a new allergy',
            bgColor: 'bg-[#1A1433]',
            dialogType: 'allergy' as const,  // Add dialogType instead of onClick
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

            {/* Dialogs - without the selectedPatient condition */}
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
        </div>
    )
}