// src/stores/patient-store.ts
import { create } from 'zustand'
import { Patient, Allergy, LabOrder, Prescription, LabResult } from '@/types'
import { useAuthStore } from './auth-store'

interface PatientState {
    patients: Patient[]
    selectedPatient: Patient | null
    isLoading: boolean
    error: string | null

    // Core patient operations
    fetchPatients: () => Promise<void>
    selectPatient: (id: string) => void
    clearError: () => void

    // Allergy operations
    addAllergy: (patientId: string, allergy: Omit<Allergy, 'id'>) => Promise<void>
    updateAllergy: (patientId: string, allergyId: string, allergy: Partial<Allergy>) => Promise<void>
    deleteAllergy: (patientId: string, allergyId: string) => Promise<void>

    // Lab order operations
    addLabOrder: (patientId: string, labOrder: Omit<LabOrder, 'id'>) => Promise<void>
    updateLabOrder: (patientId: string, orderId: string, labOrder: Partial<LabOrder>) => Promise<void>
    deleteLabOrder: (patientId: string, orderId: string) => Promise<void>
    addLabResult: (patientId: string, orderId: string, result: Omit<LabResult, 'id'>) => Promise<void>

    // Prescription operations
    addPrescription: (patientId: string, prescription: Omit<Prescription, 'id'>) => Promise<void>
    updatePrescription: (patientId: string, prescriptionId: string, prescription: Partial<Prescription>) => Promise<void>
    deletePrescription: (patientId: string, prescriptionId: string) => Promise<void>
}

export const usePatientStore = create<PatientState>((set, get) => ({
    patients: [],
    selectedPatient: null,
    isLoading: false,
    error: null,

    fetchPatients: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch('/api/patients', {
                headers: {
                    ...useAuthStore.getState().getAuthHeader()
                }
            })
            if (!response.ok) throw new Error('Failed to fetch patients')
            const data = await response.json()
            set({ patients: data, isLoading: false })
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error fetching patients',
                isLoading: false
            })
        }
    },

    selectPatient: (id) => {
        const patient = get().patients.find(p => p.id === id)
        set({ selectedPatient: patient ?? null })
    },

    clearError: () => set({ error: null }),

    // Allergy operations
    addAllergy: async (patientId, allergy) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`/api/patients/${patientId}/allergies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...useAuthStore.getState().getAuthHeader()
                },
                body: JSON.stringify(allergy)
            })
            if (!response.ok) throw new Error('Failed to add allergy')

            const newAllergy = await response.json()
            set(state => ({
                patients: state.patients.map(p =>
                    p.id === patientId
                        ? { ...p, allergies: [...p.allergies, newAllergy] }
                        : p
                ),
                selectedPatient: state.selectedPatient?.id === patientId
                    ? { ...state.selectedPatient, allergies: [...state.selectedPatient.allergies, newAllergy] }
                    : state.selectedPatient,
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error adding allergy',
                isLoading: false
            })
        }
    },

    updateAllergy: async (patientId, allergyId, allergyUpdate) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`/api/patients/${patientId}/allergies/${allergyId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...useAuthStore.getState().getAuthHeader()
                },
                body: JSON.stringify(allergyUpdate)
            })
            if (!response.ok) throw new Error('Failed to update allergy')

            const updatedAllergy = await response.json()
            set(state => ({
                patients: state.patients.map(p =>
                    p.id === patientId
                        ? {
                            ...p,
                            allergies: p.allergies.map(a =>
                                a.id === allergyId ? updatedAllergy : a
                            )
                        }
                        : p
                ),
                selectedPatient: state.selectedPatient?.id === patientId
                    ? {
                        ...state.selectedPatient,
                        allergies: state.selectedPatient.allergies.map(a =>
                            a.id === allergyId ? updatedAllergy : a
                        )
                    }
                    : state.selectedPatient,
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error updating allergy',
                isLoading: false
            })
        }
    },

    deleteAllergy: async (patientId, allergyId) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`/api/patients/${patientId}/allergies/${allergyId}`, {
                method: 'DELETE',
                headers: useAuthStore.getState().getAuthHeader()
            })
            if (!response.ok) throw new Error('Failed to delete allergy')

            set(state => ({
                patients: state.patients.map(p =>
                    p.id === patientId
                        ? {
                            ...p,
                            allergies: p.allergies.filter(a => a.id !== allergyId)
                        }
                        : p
                ),
                selectedPatient: state.selectedPatient?.id === patientId
                    ? {
                        ...state.selectedPatient,
                        allergies: state.selectedPatient.allergies.filter(a => a.id !== allergyId)
                    }
                    : state.selectedPatient,
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error deleting allergy',
                isLoading: false
            })
        }
    },

    // Lab order operations
    addLabOrder: async (patientId, labOrder) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`/api/patients/${patientId}/lab-orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...useAuthStore.getState().getAuthHeader()
                },
                body: JSON.stringify(labOrder)
            })
            if (!response.ok) throw new Error('Failed to add lab order')

            const newLabOrder = await response.json()
            set(state => ({
                patients: state.patients.map(p =>
                    p.id === patientId
                        ? { ...p, labOrders: [...p.labOrders, newLabOrder] }
                        : p
                ),
                selectedPatient: state.selectedPatient?.id === patientId
                    ? { ...state.selectedPatient, labOrders: [...state.selectedPatient.labOrders, newLabOrder] }
                    : state.selectedPatient,
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error adding lab order',
                isLoading: false
            })
        }
    },

    updateLabOrder: async (patientId, orderId, orderUpdate) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`/api/patients/${patientId}/lab-orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...useAuthStore.getState().getAuthHeader()
                },
                body: JSON.stringify(orderUpdate)
            })
            if (!response.ok) throw new Error('Failed to update lab order')

            const updatedOrder = await response.json()
            set(state => ({
                patients: state.patients.map(p =>
                    p.id === patientId
                        ? {
                            ...p,
                            labOrders: p.labOrders.map(o =>
                                o.id === orderId ? updatedOrder : o
                            )
                        }
                        : p
                ),
                selectedPatient: state.selectedPatient?.id === patientId
                    ? {
                        ...state.selectedPatient,
                        labOrders: state.selectedPatient.labOrders.map(o =>
                            o.id === orderId ? updatedOrder : o
                        )
                    }
                    : state.selectedPatient,
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error updating lab order',
                isLoading: false
            })
        }
    },

    deleteLabOrder: async (patientId, orderId) => {
        // Similar implementation to deleteAllergy
    },

    addLabResult: async (patientId, orderId, result) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch(`/api/patients/${patientId}/lab-orders/${orderId}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...useAuthStore.getState().getAuthHeader()
                },
                body: JSON.stringify(result)
            })
            if (!response.ok) throw new Error('Failed to add lab result')

            const newResult = await response.json()
            set(state => ({
                patients: state.patients.map(p =>
                    p.id === patientId
                        ? {
                            ...p,
                            labOrders: p.labOrders.map(o =>
                                o.id === orderId
                                    ? { ...o, status: 'completed', results: newResult }
                                    : o
                            )
                        }
                        : p
                ),
                selectedPatient: state.selectedPatient?.id === patientId
                    ? {
                        ...state.selectedPatient,
                        labOrders: state.selectedPatient.labOrders.map(o =>
                            o.id === orderId
                                ? { ...o, status: 'completed', results: newResult }
                                : o
                        )
                    }
                    : state.selectedPatient,
                isLoading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error adding lab result',
                isLoading: false
            })
        }
    },

    // Prescription operations
    addPrescription: async (patientId, prescription) => {
        // Similar implementation to addAllergy but for prescriptions
    },

    updatePrescription: async (patientId, prescriptionId, prescriptionUpdate) => {
        // Similar implementation to updateAllergy but for prescriptions
    },

    deletePrescription: async (patientId, prescriptionId) => {
        // Similar implementation to deleteAllergy but for prescriptions
    }
}))