import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
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

    const [selectedEdition, setSelectedEdition] = useState("2025")

    // Mock data - in a real app, this would come from your API
    const editions = ["2025", "2024", "2023", "2022"]

    const stats = {
        "2025": {
            registrations: 342,
            speakers: 28,
            sponsors: 15,
            messages: 47,
            gallery: 24,
            registrationTrend: "+12% from last week",
            messagesTrend: "+5% from last week",
        },
        "2024": {
            registrations: 450,
            speakers: 32,
            sponsors: 18,
            messages: 63,
            gallery: 120,
            registrationTrend: "Final count",
            messagesTrend: "Archive",
        },
        "2023": {
            registrations: 400,
            speakers: 30,
            sponsors: 16,
            messages: 58,
            gallery: 95,
            registrationTrend: "Final count",
            messagesTrend: "Archive",
        },
        "2022": {
            registrations: 350,
            speakers: 25,
            sponsors: 12,
            messages: 42,
            gallery: 80,
            registrationTrend: "Final count",
            messagesTrend: "Archive",
        },
    }

    const currentStats = stats[selectedEdition]

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
                            <SelectItem key={edition} value={edition}>
                                {edition} Edition
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Registrations"
                    value={currentStats.registrations}
                    icon={<UserPlus className="h-6 w-6" />}
                    change={currentStats.registrationTrend}
                    trend={currentStats.registrationTrend.includes("+") ? "up" : "neutral"}
                />
                <StatCard title="Speakers" value={currentStats.speakers} icon={<Megaphone className="h-6 w-6" />} />
                <StatCard title="Sponsors" value={currentStats.sponsors} icon={<Building className="h-6 w-6" />} />
                <StatCard
                    title="Messages"
                    value={currentStats.messages}
                    icon={<MessageSquare className="h-6 w-6" />}
                    change={currentStats.messagesTrend}
                    trend={currentStats.messagesTrend.includes("+") ? "up" : "neutral"}
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
                                {recentRegistrations.map((registration) => (
                                    <tr key={registration.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {registration.name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{registration.email}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{registration.date}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${registration.ticketType === "VIP"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : registration.ticketType === "Professional"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {registration.ticketType}
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
                                {recentMessages.map((message) => (
                                    <tr key={message.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{message.name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{message.subject}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{message.date}</td>
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
