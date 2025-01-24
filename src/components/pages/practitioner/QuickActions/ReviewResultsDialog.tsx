// src/components/dashboard/QuickActions/ReviewResultsDialog.tsx
import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePractitionerStore } from '@/store/practitioner-store'
import { LabOrderStatus, LabResultStatus } from '@/types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface ReviewResultsDialogProps {
    open: boolean
    onClose: () => void
    patientId: string
}

export function ReviewResultsDialog({ open, onClose, patientId }: ReviewResultsDialogProps) {
    const addLabResult = usePractitionerStore(state => state.addLabResult)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<string>('')
    const [labOrders, setLabOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        resultData: {},
        status: LabResultStatus.NORMAL,
        interpretation: '',
        performedBy: '',
        notes: ''
    })

    const fetchLabOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/practitioner/medical-records/${patientId}/lab-orders?status=${LabOrderStatus.PENDING}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error('Failed to fetch lab orders')
            }

            const data = await response.json()
            setLabOrders(data.data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch lab orders')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (open) {
            fetchLabOrders()
        }
    }, [open, patientId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedOrder) return

        setIsSubmitting(true)
        try {
            await addLabResult(patientId, selectedOrder, formData)
            onClose()
        } catch (error) {
            console.error('Failed to add lab result:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Review Lab Results</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-600">
                        <p>{error}</p>
                        <Button onClick={fetchLabOrders} className="mt-4">
                            Retry
                        </Button>
                    </div>
                ) : labOrders.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No pending lab orders to review</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Test Type</TableHead>
                                    <TableHead>Order Date</TableHead>
                                    <TableHead>Instructions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {labOrders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        className={`cursor-pointer ${selectedOrder === order.id ? 'bg-gray-50' : ''}`}
                                        onClick={() => setSelectedOrder(order.id)}
                                    >
                                        <TableCell>
                                            <input
                                                type="radio"
                                                name="labOrder"
                                                checked={selectedOrder === order.id}
                                                onChange={() => setSelectedOrder(order.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{order.testType}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.instructions}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {selectedOrder && (
                            <div className="space-y-4 mt-6">
                                <div>
                                    <Label htmlFor="status">Result Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={value => setFormData(prev => ({ ...prev, status: value as LabResultStatus }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={LabResultStatus.NORMAL}>Normal</SelectItem>
                                            <SelectItem value={LabResultStatus.ABNORMAL}>Abnormal</SelectItem>
                                            <SelectItem value={LabResultStatus.CRITICAL}>Critical</SelectItem>
                                            <SelectItem value={LabResultStatus.INCONCLUSIVE}>Inconclusive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="interpretation">Interpretation</Label>
                                    <Textarea
                                        id="interpretation"
                                        value={formData.interpretation}
                                        onChange={e => setFormData(prev => ({ ...prev, interpretation: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="performedBy">Performed By</Label>
                                    <input
                                        id="performedBy"
                                        className="w-full border rounded-md p-2"
                                        value={formData.performedBy}
                                        onChange={e => setFormData(prev => ({ ...prev, performedBy: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={onClose} type="button">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !selectedOrder}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Results'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}