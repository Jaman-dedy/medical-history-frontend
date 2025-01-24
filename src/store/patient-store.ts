// src/stores/patient-store.ts
import { create } from 'zustand'
import { createPatientActions } from './actions/patient-actions'
import { PatientProfile, MedicalRecordsResponse } from '@/types'

interface PatientState {
    profile: PatientProfile | null
    medicalRecords: MedicalRecordsResponse | null
    isLoading: boolean
    error: string | null
}

interface PatientStore extends PatientState {
    fetchProfile: () => Promise<void>
    fetchMedicalRecords: () => Promise<void>
    clearError: () => void
}

export const usePatientStore = create<PatientStore>((set, get) => ({
    // Initial state
    profile: null,
    medicalRecords: null,
    isLoading: false,
    error: null,

    // Combine actions
    ...createPatientActions(set, get)
}))