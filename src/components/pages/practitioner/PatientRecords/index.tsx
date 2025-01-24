// src/components/dashboard/PatientRecords.tsx
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Patient } from '@/types'

interface PatientRecordsProps {
    patients: Patient[]
    selectedPatient: Patient | null
    onSelectPatient: (patientId: string) => void
}

export function PatientRecords({ patients, selectedPatient, onSelectPatient }: PatientRecordsProps) {
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
                                        {patient.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                {selectedPatient ? (
                    <Tabs defaultValue="allergies">
                        <TabsList>
                            <TabsTrigger value="allergies">Allergies</TabsTrigger>
                            <TabsTrigger value="lab-orders">Lab Orders</TabsTrigger>
                            <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
                            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="allergies">
                            {/* Allergies content */}
                        </TabsContent>
                        <TabsContent value="lab-orders">
                            {/* Lab orders content */}
                        </TabsContent>
                        <TabsContent value="lab-results">
                            {/* Lab results content */}
                        </TabsContent>
                        <TabsContent value="prescriptions">
                            {/* Prescriptions content */}
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