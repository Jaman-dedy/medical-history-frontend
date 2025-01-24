import { Fragment, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid'
import { usePractitionerStore } from '@/store/practitioner-store'

interface AddAllergyDialogProps {
    open: boolean
    onClose: () => void
    patientId: string
}

export function AddAllergyDialog({ open, onClose, patientId }: AddAllergyDialogProps) {
    const addAllergy = usePractitionerStore(state => state.addAllergy)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        severity: '',
        reaction: '',
        notes: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await addAllergy(patientId, formData)
            onClose()
        } catch (error) {
            console.error('Failed to add allergy:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const severityOptions = [
        { value: 'mild', label: 'Mild' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'severe', label: 'Severe' }
    ]

    const inputBaseClass = "mt-1 block w-full h-12 rounded-lg border border-gray-300 bg-gray-50 pl-4 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition-colors duration-200"
    const labelBaseClass = "block text-sm font-medium text-gray-700"

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-4"
                                >
                                    Add New Allergy
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    <div>
                                        <label htmlFor="name" className={labelBaseClass}>Allergy Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className={inputBaseClass}
                                            value={formData.name}
                                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="Enter allergy name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={labelBaseClass}>Severity</label>
                                        <Listbox
                                            value={formData.severity}
                                            onChange={value => setFormData(prev => ({ ...prev, severity: value }))}
                                        >
                                            <div className="relative mt-1">
                                                <Listbox.Button className={`${inputBaseClass} flex items-center justify-between pr-4`}>
                                                    <span className="block truncate">
                                                        {formData.severity ?
                                                            severityOptions.find(opt => opt.value === formData.severity)?.label
                                                            : 'Select severity'}
                                                    </span>
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {severityOptions.map((option) => (
                                                            <Listbox.Option
                                                                key={option.value}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={option.value}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                            {option.label}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>

                                    <div>
                                        <label htmlFor="reaction" className={labelBaseClass}>Reaction</label>
                                        <textarea
                                            id="reaction"
                                            className={`${inputBaseClass} h-32 resize-none py-3`}
                                            value={formData.reaction}
                                            onChange={e => setFormData(prev => ({ ...prev, reaction: e.target.value }))}
                                            placeholder="Describe the allergic reaction"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className={labelBaseClass}>Notes</label>
                                        <textarea
                                            id="notes"
                                            className={`${inputBaseClass} h-32 resize-none py-3`}
                                            value={formData.notes}
                                            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                            placeholder="Any additional notes or comments"
                                        />
                                    </div>

                                    <div className="mt-8 flex justify-end space-x-4 border-t border-gray-200 pt-4">
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            {isSubmitting ? 'Adding...' : 'Add Allergy'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}