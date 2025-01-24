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
    ChartBarIcon
} from '@heroicons/react/24/outline'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Patients', href: '/patients', icon: UsersIcon },
    { name: 'Lab Orders', href: '/lab-orders', icon: BeakerIcon },
    { name: 'Results', href: '/results', icon: ClipboardIcon },
    { name: 'Prescriptions', href: '/prescriptions', icon: DocumentTextIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
]

const departments = [
    { id: 1, name: 'Cardiology', href: '#', initial: 'C', current: false },
    { id: 2, name: 'Neurology', href: '#', initial: 'N', current: false },
    { id: 3, name: 'Pediatrics', href: '#', initial: 'P', current: false },
]

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
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

    const renderNavigationItem = (item: typeof navigation[0]) => {
        const isActive = pathname === item.href

        return (
            <li key={item.name}>
                <Link
                    href={item.href}
                    className={classNames(
                        isActive
                            ? 'bg-secondary text-white'
                            : 'text-gray-300 hover:bg-secondary hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                    )}
                >
                    <item.icon className="size-6 shrink-0" aria-hidden="true" />
                    {item.name}
                </Link>
            </li>
        )
    }


    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        className="fixed inset-0 bg-primary/80"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            className="relative mr-16 flex w-full max-w-xs flex-1"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="size-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4 ring-1 ring-white/10">
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
                                        <li>
                                            <div className="text-xs font-semibold leading-6 text-gray-400">Departments</div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {departments.map((department) => (
                                                    <li key={department.name}>
                                                        <a
                                                            href={department.href}
                                                            className={classNames(
                                                                department.current
                                                                    ? 'bg-primary-light text-white'
                                                                    : 'text-gray-400 hover:bg-secondary hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                            )}
                                                        >
                                                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-primary-light text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                {department.initial}
                                                            </span>
                                                            <span className="truncate">{department.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <a
                                                href="#"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-secondary hover:text-white"
                                            >
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

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
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
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-gray-400">Departments</div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {departments.map((department) => (
                                            <li key={department.name}>
                                                <a
                                                    href={department.href}
                                                    className={classNames(
                                                        department.current
                                                            ? 'bg-primary-light text-white'
                                                            : 'text-gray-400 hover:bg-secondary hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                    )}
                                                >
                                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-primary-light text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                        {department.initial}
                                                    </span>
                                                    <span className="truncate">{department.name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-secondary hover:text-white"
                                    >
                                        <Cog6ToothIcon className="size-6 shrink-0" aria-hidden="true" />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="size-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div className="h-6 w-px bg-primary/10 lg:hidden" aria-hidden="true" />

                        <div className="flex flex-1 gap-x-4 self-stretch items-center lg:gap-x-6">
                            <form className="relative flex flex-1" action="#" method="GET">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 size-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="h-10 w-full rounded-md pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="size-6" aria-hidden="true" />
                                </button>

                                {/* Separator */}
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-primary/10" aria-hidden="true" />

                                {/* Profile dropdown */}
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
                                                Dr. Smith
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