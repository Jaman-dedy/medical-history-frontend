import { StateCreator } from 'zustand'
import { useAuthStore } from '../auth-store'
import { MedicalRecordActions, PractitionerStore } from '@/types'

export const createMedicalRecordActions: StateCreator<
    PractitionerStore,
    [],
    [],
    MedicalRecordActions
> = (set, get) => ({
    addAllergy: async (patientId, data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/practitioner/medical-records/${patientId}/allergies`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useAuthStore.getState().token}`
                    },
                    body: JSON.stringify(data)
                }
            )

            if (!response.ok) {
                throw new Error('Failed to add allergy')
            }

            await get().fetchPatientSummary()
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to add allergy' })
        } finally {
            set({ isLoading: false })
        }
    },

    addLabOrder: async (patientId, data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/practitioner/medical-records/${patientId}/lab-orders`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useAuthStore.getState().token}`
                    },
                    body: JSON.stringify(data)
                }
            )

            if (!response.ok) {
                throw new Error('Failed to create lab order')
            }

            await get().fetchPatientSummary()
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to create lab order' })
        } finally {
            set({ isLoading: false })
        }
    },

    addPrescription: async (patientId, data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/practitioner/medical-records/${patientId}/prescriptions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useAuthStore.getState().token}`
                    },
                    body: JSON.stringify(data)
                }
            )

            if (!response.ok) {
                throw new Error('Failed to add prescription')
            }

            await get().fetchPatientSummary()
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to add prescription' })
        } finally {
            set({ isLoading: false })
        }
    },

    addLabResult: async (patientId, labOrderId, data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/practitioner/medical-records/${patientId}/lab-results`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${useAuthStore.getState().token}`
                    },
                    body: JSON.stringify({
                        ...data,
                        labOrderId
                    })
                }
            )

            if (!response.ok) {
                throw new Error('Failed to add lab result')
            }

            await get().fetchPatientSummary()
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to add lab result' })
        } finally {
            set({ isLoading: false })
        }
    }
})