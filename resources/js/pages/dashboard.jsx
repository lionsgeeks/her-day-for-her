import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { StatCard } from "@/components/stat-card"
import { MessageSquare, UserPlus, Megaphone, Building } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const {editions, messages, registrations} = usePage().props

    const [selectedEdition, setSelectedEdition] = useState(editions[0])

    // Recent registrations - mock data
    const recentRegistrations = [
        { id: 1, name: "Emma Johnson", email: "emma@example.com", date: "2023-12-01", ticketType: "VIP" },
        { id: 2, name: "Sophia Chen", email: "sophia@example.com", date: "2023-12-01", ticketType: "Professional" },
        { id: 3, name: "Olivia Martinez", email: "olivia@example.com", date: "2023-11-30", ticketType: "Student" },
        { id: 4, name: "Isabella Kim", email: "isabella@example.com", date: "2023-11-30", ticketType: "Professional" },
        { id: 5, name: "Ava Williams", email: "ava@example.com", date: "2023-11-29", ticketType: "Professional" },
    ]

    // Recent messages - mock data
    const recentMessages = [
        { id: 1, name: "John Smith", email: "john@example.com", date: "2023-12-01", subject: "Speaking opportunity" },
        { id: 2, name: "Maria Garcia", email: "maria@example.com", date: "2023-12-01", subject: "Sponsorship inquiry" },
        { id: 3, name: "David Lee", email: "david@example.com", date: "2023-11-30", subject: "Registration question" },
        { id: 4, name: "Sarah Johnson", email: "sarah@example.com", date: "2023-11-29", subject: "Media partnership" },
        { id: 5, name: "James Wilson", email: "james@example.com", date: "2023-11-28", subject: "Accessibility needs" },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />


            <div className="mb-6">
                <Select value={selectedEdition} onValueChange={setSelectedEdition}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Edition" />
                    </SelectTrigger>
                    <SelectContent>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={edition.id}>
                                {edition.year} Edition
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Registrations"
                    value={selectedEdition.registrations ? selectedEdition.registrations.length : 0}
                    icon={<UserPlus className="h-6 w-6" />}
                />
                <StatCard title="Speakers" value={selectedEdition.speakers ? selectedEdition.speakers.length : 0} icon={<Megaphone className="h-6 w-6" />} />
                <StatCard title="Sponsors" value={selectedEdition.sponsors ? selectedEdition.sponsors.length : 0} icon={<Building className="h-6 w-6" />} />
                <StatCard
                    title="Messages"
                    value={messages.length}
                    icon={<MessageSquare className="h-6 w-6" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Registrations</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {registrations.map((registration) => (
                                    <tr key={registration.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {registration.first_name} {registration.last_name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{registration.email}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(registration.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${registration.status === "VIP"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : registration.status === "Professional"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {registration.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {messages.map((message) => (
                                    <tr key={message.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{message.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{message.message}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(message.created_at).toLocaleDateString()}-{new Date(message.created_at).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>



        </AppLayout>
    );
}
