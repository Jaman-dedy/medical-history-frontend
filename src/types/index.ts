// src/types/index.ts
export interface User {
    id: string
    username: string
    role: 'practitioner' | 'patient'
    name: string
    email: string
}

// Add these new auth-related types
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

// Existing types
export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    allergies: Allergy[]
    labOrders: LabOrder[]
    prescriptions: Prescription[]
}

export interface Allergy {
    id: string
    name: string
    severity: 'mild' | 'moderate' | 'severe'
    dateIdentified: string
}

export interface LabOrder {
    id: string
    testName: string
    orderDate: string
    status: 'pending' | 'completed' | 'cancelled'
    results?: LabResult
}

export interface LabResult {
    id: string
    resultDate: string
    value: string
    notes: string
    attachments?: string[]
}

export interface Prescription {
    id: string
    medicationName: string
    dosage: string
    frequency: string
    startDate: string
    endDate: string
    status: 'active' | 'completed' | 'cancelled'
    instructions: string
}