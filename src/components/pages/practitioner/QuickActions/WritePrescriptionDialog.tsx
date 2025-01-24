import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { usePractitionerStore } from '@/store/practitioner-store'

interface WritePrescriptionDialogProps {
    open: boolean
    onClose: () => void
    patientId: string
}

export function WritePrescriptionDialog({ open, onClose, patientId }: WritePrescriptionDialogProps) {
    const addPrescription = usePractitionerStore(state => state.addPrescription)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        medication: '',
        dosage: '',
        frequency: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        isActive: true,
        instructions: '',
        notes: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await addPrescription(patientId, formData)
            onClose()
        } catch (error) {
            console.error('Failed to add prescription:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputBaseClass = "mt-1 block w-full h-12 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm transition-colors duration-200"
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
                                    Write Prescription
                                </Dialog.Title>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    {/* Medication */}
                                    <div className="bg-white rounded-lg">
                                        <label htmlFor="medication" className={labelBaseClass}>
                                            Medication
                                        </label>
                                        <input
                                            type="text"
                                            id="medication"
                                            required
                                            className={inputBaseClass}
                                            value={formData.medication}
                                            onChange={e => setFormData(prev => ({ ...prev, medication: e.target.value }))}
                                            placeholder="Enter medication name"
                                        />
                                    </div>

                                    {/* Dosage and Frequency row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="dosage" className={labelBaseClass}>
                                                Dosage
                                            </label>
                                            <input
                                                type="text"
                                                id="dosage"
                                                required
                                                placeholder="e.g., 500mg"
                                                className={inputBaseClass}
                                                value={formData.dosage}
                                                onChange={e => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="frequency" className={labelBaseClass}>
                                                Frequency
                                            </label>
                                            <select
                                                id="frequency"
                                                required
                                                className={inputBaseClass}
                                                value={formData.frequency}
                                                onChange={e => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                                            >
                                                <option value="">Select frequency</option>
                                                <option value="Once daily">Once daily</option>
                                                <option value="Twice daily">Twice daily</option>
                                                <option value="Three times daily">Three times daily</option>
                                                <option value="Four times daily">Four times daily</option>
                                                <option value="Every 4 hours">Every 4 hours</option>
                                                <option value="Every 6 hours">Every 6 hours</option>
                                                <option value="Every 8 hours">Every 8 hours</option>
                                                <option value="Every 12 hours">Every 12 hours</option>
                                                <option value="As needed">As needed</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Dates row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="startDate" className={labelBaseClass}>
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                required
                                                className={inputBaseClass}
                                                value={formData.startDate}
                                                onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="endDate" className={labelBaseClass}>
                                                End Date (Optional)
                                            </label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                className={inputBaseClass}
                                                value={formData.endDate}
                                                min={formData.startDate}
                                                onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div>
                                        <label htmlFor="instructions" className={labelBaseClass}>
                                            Instructions
                                        </label>
                                        <textarea
                                            id="instructions"
                                            rows={3}
                                            className={`${inputBaseClass} resize-none`}
                                            value={formData.instructions}
                                            onChange={e => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                                            placeholder="Enter detailed instructions for the patient"
                                        />
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label htmlFor="notes" className={labelBaseClass}>
                                            Additional Notes
                                        </label>
                                        <textarea
                                            id="notes"
                                            rows={2}
                                            className={`${inputBaseClass} resize-none`}
                                            value={formData.notes}
                                            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                            placeholder="Any additional notes or comments"
                                        />
                                    </div>

                                    {/* Action Buttons */}
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
                                            {isSubmitting ? 'Saving...' : 'Save Prescription'}
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