// src/components/dashboard/PatientRecords.tsx
import { useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SearchPatientResult, MedicalRecord } from '@/types'

interface PatientRecordsProps {
    patients: SearchPatientResult[]
    selectedPatient: SearchPatientResult | null
    medicalRecords: MedicalRecord[] | null
    onSelectPatient: (patientId: string) => void
}

export function PatientRecords({
    patients,
    selectedPatient,
    medicalRecords,
    onSelectPatient
}: PatientRecordsProps) {
    return (
        <Card className="mt-6">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Patient Records</CardTitle>
                    <Select
                        value={selectedPatient?.id}
                        onValueChange={onSelectPatient}
                    >
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {patients.map((patient) => (
                                    <SelectItem key={patient.id} value={patient.id}>
                                        {patient.user.firstName} {patient.user.lastName}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                {selectedPatient && medicalRecords ? (
                    <Tabs defaultValue="allergies">
                        <TabsList>
                            <TabsTrigger value="allergies">
                                Allergies ({medicalRecords[0]?.allergies?.length || 0})
                            </TabsTrigger>
                            <TabsTrigger value="lab-orders">
                                Lab Orders ({medicalRecords[0]?.labOrders?.length || 0})
                            </TabsTrigger>
                            <TabsTrigger value="prescriptions">
                                Prescriptions ({medicalRecords[0]?.prescriptions?.length || 0})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="allergies" className="mt-4">
                            <div className="space-y-4">
                                {medicalRecords[0]?.allergies?.map((allergy) => (
                                    <div key={allergy.id} className="p-4 border rounded-lg">
                                        <h3 className="font-medium">{allergy.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">Severity: {allergy.severity}</p>
                                        <p className="text-sm text-gray-600">Reaction: {allergy.reaction}</p>
                                        {allergy.notes && <p className="text-sm text-gray-500 mt-1">{allergy.notes}</p>}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="lab-orders" className="mt-4">
                            <div className="space-y-4">
                                {medicalRecords[0]?.labOrders?.map((order) => (
                                    <div key={order.id} className="p-4 border rounded-lg">
                                        <h3 className="font-medium">{order.testType}</h3>
                                        <p className="text-sm text-gray-600 mt-1">Status: {order.status}</p>
                                        {order.instructions && <p className="text-sm mt-1">{order.instructions}</p>}
                                        {order.notes && <p className="text-sm text-gray-500 mt-1">{order.notes}</p>}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="prescriptions" className="mt-4">
                            <div className="space-y-4">
                                {medicalRecords[0]?.prescriptions?.map((prescription) => (
                                    <div key={prescription.id} className="p-4 border rounded-lg">
                                        <h3 className="font-medium">{prescription.medication}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {prescription.dosage} - {prescription.frequency}
                                        </p>
                                        {prescription.instructions && (
                                            <p className="text-sm mt-1">{prescription.instructions}</p>
                                        )}
                                        {prescription.notes && (
                                            <p className="text-sm text-gray-500 mt-1">{prescription.notes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-gray-500">Select a patient to view their records</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}