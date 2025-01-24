// src/app/(dashboard)/practitioner/page.tsx
'use client'

import { useAuthStore } from '@/store/auth-store'
import { usePatientStore } from '@/store/patient-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Patient } from '@/types'
import { useState } from 'react'

export default function PractitionerDashboard() {
    const { user } = useAuthStore()
    const { selectedPatient, patients, setSelectedPatient } = usePatientStore()
    const [activeTab, setActiveTab] = useState('allergies')

    const handlePatientSelect = (patientId: string) => {
        const patient = patients.find(p => p.id === patientId)
        setSelectedPatient(patient || null)
    }

    return (
        <div className="space-y-6">
            {/* Header with Welcome Message */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, Dr. {user?.name}</h1>
                    <p className="text-muted-foreground">Manage your patients' medical records</p>
                </div>
            </div>

            {/* Patient Selection */}
            <Card>
                <CardHeader>
                    <CardTitle>Select Patient</CardTitle>
                    <CardDescription>Choose a patient to view or update their records</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="patient">Patient</Label>
                        <Select
                            value={selectedPatient?.id}
                            onValueChange={handlePatientSelect}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a patient" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {patients.map((patient) => (
                                        <SelectItem key={patient.id} value={patient.id}>
                                            {patient.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Patient Records */}
            {selectedPatient && (
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedPatient.name}'s Medical Records</CardTitle>
                        <CardDescription>View and manage medical information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="allergies">Allergies</TabsTrigger>
                                <TabsTrigger value="lab-orders">Lab Orders</TabsTrigger>
                                <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="allergies">
                                {/* Add AllergiesForm component here */}
                            </TabsContent>
                            <TabsContent value="lab-orders">
                                {/* Add LabOrdersForm component here */}
                            </TabsContent>
                            <TabsContent value="lab-results">
                                {/* Add LabResultsForm component here */}
                            </TabsContent>
                            <TabsContent value="prescriptions">
                                {/* Add PrescriptionsForm component here */}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}