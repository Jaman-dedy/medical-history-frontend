import { StateCreator } from 'zustand'
import { useAuthStore } from '../auth-store'

export const createPatientActions = (set: any, get: any) => ({
    fetchProfile: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/my-profile`, {
                headers: {
                    Authorization: `Bearer ${useAuthStore.getState().token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch profile')
            }

            const { data } = await response.json()
            set({
                profile: data,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch profile',
                isLoading: false
            })
        }
    },

    fetchMedicalRecords: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/my-medical-records`, {
                headers: {
                    Authorization: `Bearer ${useAuthStore.getState().token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch medical records')
            }

            const { data } = await response.json()
            set({
                medicalRecords: data,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch medical records',
                isLoading: false
            })
        }
    },

    clearError: () => set({ error: null })
})