import { Fragment, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid'
import { usePractitionerStore } from '@/store/practitioner-store'
import { LabOrderStatus } from '@/types'

interface CreateLabOrderDialogProps {
    open: boolean
    onClose: () => void
    patientId: string
}

export function CreateLabOrderDialog({ open, onClose, patientId }: CreateLabOrderDialogProps) {
    const addLabOrder = usePractitionerStore(state => state.addLabOrder)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        testType: '',
        status: LabOrderStatus.PENDING,
        instructions: '',
        notes: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await addLabOrder(patientId, formData)
            onClose()
        } catch (error) {
            console.error('Failed to create lab order:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const testTypes = [
        'Complete Blood Count (CBC)',
        'Basic Metabolic Panel (BMP)',
        'Comprehensive Metabolic Panel (CMP)',
        'Lipid Panel',
        'Thyroid Function Tests',
        'Hemoglobin A1C',
        'Urinalysis',
        'Liver Function Tests',
        'Other'
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
                                    Create New Lab Order
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    <div>
                                        <label className={labelBaseClass}>Test Type</label>
                                        <Listbox
                                            value={formData.testType}
                                            onChange={value => setFormData(prev => ({ ...prev, testType: value }))}
                                        >
                                            <div className="relative mt-1">
                                                <Listbox.Button className={`${inputBaseClass} flex items-center justify-between pr-4`}>
                                                    <span className="block truncate">
                                                        {formData.testType || 'Select test type'}
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
                                                        {testTypes.map((type) => (
                                                            <Listbox.Option
                                                                key={type}
                                                                className={({ active }) =>
                                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={type}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                            {type}
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

                                    {formData.testType === 'Other' && (
                                        <div>
                                            <label className={labelBaseClass}>Specify Test Type</label>
                                            <input
                                                type="text"
                                                className={inputBaseClass}
                                                value={formData.testType}
                                                onChange={e => setFormData(prev => ({ ...prev, testType: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className={labelBaseClass}>Instructions</label>
                                        <textarea
                                            className={`${inputBaseClass} h-32 resize-none py-3`}
                                            value={formData.instructions}
                                            onChange={e => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                                            placeholder="Special instructions for the laboratory"
                                        />
                                    </div>

                                    <div>
                                        <label className={labelBaseClass}>Additional Notes</label>
                                        <textarea
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
                                            {isSubmitting ? 'Creating...' : 'Create Lab Order'}
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