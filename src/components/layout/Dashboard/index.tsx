// src/components/layout/DashboardLayout.tsx
'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    UsersIcon,
    ClipboardIcon,
    BeakerIcon,
    DocumentTextIcon,
    HomeIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    HeartIcon,
    CalendarIcon
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/auth-store'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { usePractitionerStore } from '@/store/practitioner-store'
import { useToast } from "@/hooks/use-toast"

// Define role-specific navigation
const practitionerNavigation = [
    { name: 'Dashboard', href: '/practitioner/', icon: HomeIcon },
    { name: 'Patients', href: '/practitioner/patients', icon: UsersIcon },
    { name: 'Lab Orders', href: '/practitioner/lab-orders', icon: BeakerIcon },
    { name: 'Results', href: '/practitioner/results', icon: ClipboardIcon },
    { name: 'Prescriptions', href: '/practitioner/prescriptions', icon: DocumentTextIcon },
    { name: 'Analytics', href: '/practitioner/analytics', icon: ChartBarIcon },
]

const patientNavigation = [
    { name: 'Dashboard', href: '/patient/', icon: HomeIcon },
    { name: 'Medical History', href: '/patient/medical-history', icon: ClipboardIcon },
    { name: 'Prescriptions', href: '/patient/prescriptions', icon: DocumentTextIcon },
    { name: 'Lab Results', href: '/patient/lab-results', icon: BeakerIcon },
    { name: 'Appointments', href: '/patient/appointments', icon: CalendarIcon },
    { name: 'Health Records', href: '/patient/health-records', icon: HeartIcon },
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { user } = useAuthStore()

    const router = useRouter()
    const { toast } = useToast()
    const [searchQuery, setSearchQuery] = useState('')
    const { searchPatients, searchResults, selectPatient,
        fetchMedicalRecords } = usePractitionerStore()
    const { logout } = useAuthStore()

    // Get the appropriate navigation based on user role
    const navigation = user?.role === 'practitioner' ? practitionerNavigation : patientNavigation

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)

        if (query.trim()) {
            try {
                await searchPatients(query)
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Search failed",
                    description: "Failed to search patients. Please try again.",
                })
            }
        }
    }

    const handleLogout = () => {
        logout()
        router.push('/login')
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        })
    }

    const userNavigation = [
        { name: 'Your profile', href: '#' },
        { name: 'Settings', href: '#' },
        {
            name: 'Sign out',
            href: '#',
            onClick: handleLogout
        },
    ]

    const handlePatientSelect = async (patientId: string) => {
        try {
            selectPatient(patientId)
            await fetchMedicalRecords(patientId)
            setSearchQuery('')  // Clear the search
            toast({
                title: "Patient selected",
                description: "Successfully loaded patient records.",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load patient records. Please try again.",
            })
        }
    }

    const renderNavigationItem = (item: typeof navigation[0]) => {
        const isActive = pathname === item.href

        return (
            <li key={item.name}>
                <Link
                    href={item.href}
                    className={classNames(
                        isActive
                            ? 'bg-[#2A2443] text-white'
                            : 'text-gray-300 hover:bg-[#2A2443] hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                    )}
                >
                    <item.icon className="size-6 shrink-0" aria-hidden="true" />
                    {item.name}
                </Link>
            </li>
        )
    }

    // Rest of your component remains largely the same, but we'll update the branding and user info
    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop className="fixed inset-0 bg-[#1A1433]/80" />
                    {/* Mobile sidebar content */}
                    <div className="fixed inset-0 flex">
                        <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild>
                                {/* ... existing mobile sidebar content, but using 'navigation' variable */}
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="size-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1A1433] px-6 pb-4 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <span className="text-white text-xl font-bold">eFiche</span>
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map(renderNavigationItem)}
                                            </ul>
                                        </li>
                                        {user?.role === 'practitioner' && (
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-gray-400">Departments</div>
                                                {/* ... existing departments list */}
                                            </li>
                                        )}
                                        <li className="mt-auto">
                                            <a href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-[#2A2443] hover:text-white">
                                                <Cog6ToothIcon className="size-6 shrink-0" aria-hidden="true" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Desktop sidebar */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1A1433] px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <span className="text-white text-xl font-bold">eFiche</span>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map(renderNavigationItem)}
                                    </ul>
                                </li>
                                {user?.role === 'practitioner' && (
                                    <li>
                                        <div className="text-xs font-semibold leading-6 text-gray-400">Departments</div>
                                        {/* ... existing departments list */}
                                    </li>
                                )}
                                <li className="mt-auto">
                                    <a href="#" className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-[#2A2443] hover:text-white">
                                        <Cog6ToothIcon className="size-6 shrink-0" aria-hidden="true" />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main content area */}
                <div className="lg:pl-72">
                    {/* Top navigation */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="size-6" aria-hidden="true" />
                        </button>

                        <div className="h-6 w-px bg-[#1A1433]/10 lg:hidden" aria-hidden="true" />

                        <div className="flex flex-1 gap-x-4 self-stretch items-center lg:gap-x-6">
                            {user?.role === 'practitioner' ? (
                                <form className="relative flex flex-1" onSubmit={(e) => e.preventDefault()}>
                                    <label htmlFor="search-field" className="sr-only">
                                        Search Patients
                                    </label>
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute inset-y-0 left-0 size-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="search-field"
                                        className="h-10 w-full rounded-md pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                                        placeholder="Search patients..."
                                        type="search"
                                        name="search"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    {searchQuery && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg py-1 z-50">
                                            {searchResults.map((patient) => (
                                                <div
                                                    key={patient.id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        handlePatientSelect(patient.id)
                                                        setSearchQuery('')
                                                    }}
                                                >
                                                    <div className="font-medium">{patient.user.firstName} {patient.user.lastName}</div>
                                                    <div className="text-sm text-gray-500">{patient.dateOfBirth}</div>
                                                </div>
                                            ))}
                                            {searchResults.length === 0 && (
                                                <div className="px-4 py-2 text-sm text-gray-500">
                                                    No patients found
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </form>
                            ) : (
                                <div className="flex-1" />
                            )}
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="size-6" aria-hidden="true" />
                                </button>

                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-[#1A1433]/10" aria-hidden="true" />

                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="size-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                                {user?.firstName} {user?.lastName}
                                            </span>
                                            <ChevronDownIcon className="ml-2 size-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                {({ active }) => (
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-50' : '',
                                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                        )}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            item.onClick?.()
                                                        }}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    )
}