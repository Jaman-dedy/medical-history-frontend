// src/types/index.ts

// Auth Types
export interface User {
    id: string
    username: string
    role: 'practitioner' | 'patient'
    name: string
    email: string
    firstName?: string
    lastName?: string
}

export interface AuthError {
    message: string
    code?: string
}

export interface AuthResponse {
    user: User
    token: string
}

export interface LoginCredentials {
    username: string
    password: string
}

// Medical Record Status Enums
export enum LabOrderStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum LabResultStatus {
    NORMAL = 'normal',
    ABNORMAL = 'abnormal',
    CRITICAL = 'critical',
    INCONCLUSIVE = 'inconclusive'
}

// Medical Record Types
export interface Allergy {
    id: string
    name: string
    severity?: string
    reaction?: string
    notes?: string
    createdAt: Date
    updatedAt: Date
}

export interface LabOrder {
    id: string
    testType: string
    status: LabOrderStatus
    instructions?: string
    notes?: string
    orderDate?: string
    createdAt: Date
    updatedAt: Date
    results?: LabResult[]
}

export interface LabResult {
    id: string
    labOrder: LabOrder
    resultData: Record<string, any>
    status?: LabResultStatus
    interpretation?: string
    performedBy?: string
    fileUrl?: string
    resultDate?: string
    value?: string
    notes?: string
    attachments?: string[]
    createdAt: Date
    updatedAt: Date
}

export interface Prescription {
    id: string
    medication: string
    dosage: string
    frequency: string
    startDate: Date
    endDate?: Date
    isActive: boolean
    instructions?: string
    notes?: string
    createdAt: Date
    updatedAt: Date
}

// Patient Types
export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    allergies: Allergy[]
    labOrders: LabOrder[]
    prescriptions: Prescription[]
    user?: User
}

export interface PatientSummary {
    patientInfo: {
        id: string
        name: string
        dateOfBirth: string
        bloodType: string
    }
    statistics: {
        activeAllergies: number
        activePrescriptions: number
        pendingLabOrders: number
        recentResults: number
    }
    recentActivities: Array<{
        type: string
        date: string
        description: string
    }>
}

export interface SearchPatientResult {
    id: string
    dateOfBirth: string
    bloodType: string
    user: {
        id: string
        email: string
        firstName: string
        lastName: string
    }
}

// API Types
export interface ApiResponse<T> {
    success: boolean
    data: T
}

// Store Types
export interface PractitionerState {
    patients: SearchPatientResult[]
    selectedPatient: SearchPatientResult | null
    patientSummary: PatientSummary | null
    searchResults: SearchPatientResult[]
    isLoading: boolean
    error: string | null
    medicalRecords: MedicalRecord[] | null
}

export interface PatientProfile {
    id: string
    dateOfBirth: string
    bloodType: string
    emergencyContact: string | null
    emergencyPhone: string | null
    firstName: string
    lastName: string
    email: string
}

export interface PatientMedicalSummary {
    totalAllergies: number
    activePrescriptions: number
    pendingLabResults: number
}


export interface MedicalRecordsResponse {
    summary: PatientMedicalSummary
    allergies: Allergy[]
    labOrders: LabOrder[]
    prescriptions: Prescription[]
    recentUpdates: Array<{
        type: 'prescription' | 'labOrder' | 'allergy'
        id: string
        [key: string]: any
    }>
}

// In types/index.ts
export interface MedicalRecord {
    id: string
    notes: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    allergies: Allergy[]
    labOrders: LabOrder[]
    prescriptions: Prescription[]
}

export interface MedicalRecordActions {
    addAllergy: (patientId: string, data: Omit<Allergy, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    addLabOrder: (patientId: string, data: Omit<LabOrder, 'id' | 'createdAt' | 'updatedAt' | 'results'>) => Promise<void>
    addPrescription: (patientId: string, data: Omit<Prescription, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    addLabResult: (patientId: string, labOrderId: string, data: Omit<LabResult, 'id' | 'createdAt' | 'updatedAt' | 'labOrder'>) => Promise<void>
}

export interface PatientActions {
    fetchPatients: () => Promise<void>
    fetchPatientSummary: () => Promise<void>
    searchPatients: (query: string) => Promise<void>
    selectPatient: (patientId: string) => void
    fetchMedicalRecords: (patientId: string) => Promise<void>  // Add this line
    clearSearchResults: () => void
    clearError: () => void
}

export type PractitionerStore = PractitionerState & MedicalRecordActions & PatientActions