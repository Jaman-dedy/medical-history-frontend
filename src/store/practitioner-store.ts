import { create } from 'zustand'
import { PractitionerStore } from '@/types'
import { createMedicalRecordActions } from './actions/medical-records'
import { createPatientActions } from './actions/patient'

export const usePractitionerStore = create<PractitionerStore>()((set, get, store) => ({
    // Initial state
    patients: [],
    selectedPatient: null,
    patientSummary: null,
    searchResults: [],
    medicalRecords: null,
    isLoading: false,
    error: null,

    // Combine actions
    ...createMedicalRecordActions(set, get, store),
    ...createPatientActions(set, get, store)
}))