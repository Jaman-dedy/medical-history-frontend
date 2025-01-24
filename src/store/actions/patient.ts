import { StateCreator } from 'zustand'
import { useAuthStore } from '../auth-store'
import { PatientActions, PractitionerState, SearchPatientResult, PatientSummary } from '@/types'
import { ApiResponse } from '@/types'

export const createPatientActions: StateCreator<
    PractitionerState & PatientActions,
    [],
    [],
    PatientActions
> = (set, get) => ({
    fetchPatients: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/practitioner/patients`, {
                headers: {
                    Authorization: `Bearer ${useAuthStore.getState().token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch patients')
            }

            const { data }: ApiResponse<SearchPatientResult[]> = await response.json()
            set({
                patients: data,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch patients',
                isLoading: false
            })
        }
    },

    fetchPatientSummary: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/practitioner/patients/summary`, {
                headers: {
                    Authorization: `Bearer ${useAuthStore.getState().token}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch patient summary')
            }

            const { data }: ApiResponse<PatientSummary> = await response.json()
            set({
                patientSummary: data,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch patient summary',
                isLoading: false
            })
        }
    },

    searchPatients: async (query) => {
        if (!query.trim()) {
            set({ searchResults: [] })
            return
        }

        set({ isLoading: true, error: null })
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/practitioner/patients/search?query=${encodeURIComponent(query)}`,
                {
                    headers: {
                        Authorization: `Bearer ${useAuthStore.getState().token}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error('Failed to search patients')
            }

            const { data }: ApiResponse<SearchPatientResult[]> = await response.json()
            set({
                searchResults: data,
                isLoading: false
            })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to search patients',
                isLoading: false
            })
        }
    },

    selectPatient: (patientId) => {
        const patient = get().patients.find(p => p.id === patientId)
        set({ selectedPatient: patient || null })
    },

    clearSearchResults: () => {
        set({ searchResults: [] })
    },

    clearError: () => {
        set({ error: null })
    }
})