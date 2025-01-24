import DashboardLayout from '@/components/layout/Dashboard'
import { RoleGuard } from '@/components/auth/RoleGuard'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RoleGuard>
            <DashboardLayout>{children}</DashboardLayout>
        </RoleGuard>
    )
}