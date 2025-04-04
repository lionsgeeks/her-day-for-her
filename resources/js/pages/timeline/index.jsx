import { useState } from "react"
import AdminHeader from "@/components/admin-header"
// import { ConfirmationModal } from "../components/confirmation-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';

export default function TimelinePage() {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedEdition, setSelectedEdition] = useState("2025")

    // Mock data - in a real app, this would come from your API
    const editions = ["2025", "2024", "2023", "2022"]

    const timelineEvents = [
        {
            id: 1,
            title: "Opening Ceremony",
            description: "Join us for the official opening with keynote speeches from industry leaders.",
            date: "June 15, 2025",
            time: "09:00 - 10:30",
            location: "Main Hall",
            category: "Ceremony",
        },
        {
            id: 2,
            title: "Women in Tech Panel",
            description: "Engaging discussions on women's leadership in technology and innovation.",
            date: "June 15, 2025",
            time: "11:00 - 12:30",
            location: "Panel Room A",
            category: "Panel",
        },
        {
            id: 3,
            title: "Networking Lunch",
            description: "Connect with peers and speakers in a relaxed environment.",
            date: "June 15, 2025",
            time: "12:30 - 14:00",
            location: "Dining Hall",
            category: "Networking",
        },
        {
            id: 4,
            title: "AI in Healthcare Workshop",
            description: "Interactive session on the latest AI applications in healthcare.",
            date: "June 15, 2025",
            time: "14:30 - 16:00",
            location: "Workshop Room B",
            category: "Workshop",
        },
        {
            id: 5,
            title: "Evening Reception",
            description: "Celebrate the first day with drinks, canapés, and entertainment.",
            date: "June 15, 2025",
            time: "18:00 - 20:00",
            location: "Rooftop Terrace",
            category: "Social",
        },
        {
            id: 6,
            title: "Leadership Masterclass",
            description: "Develop your leadership skills with this hands-on masterclass.",
            date: "June 16, 2025",
            time: "09:00 - 11:00",
            location: "Workshop Room A",
            category: "Workshop",
        },
        {
            id: 7,
            title: "Tech Showcase",
            description: "Demonstrations of cutting-edge technologies and innovations.",
            date: "June 16, 2025",
            time: "11:30 - 13:00",
            location: "Exhibition Hall",
            category: "Exhibition",
        },
        {
            id: 8,
            title: "Closing Ceremony",
            description: "Celebrate the success of the conference and future opportunities.",
            date: "June 17, 2025",
            time: "16:00 - 17:30",
            location: "Main Hall",
            category: "Ceremony",
        },
    ]

    const handleDelete = (id) => {
        setSelectedEvent(id)
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        // In a real app, you would call your API to delete the event
        console.log(`Deleting event ${selectedEvent}`)
        // Then update your local state or refetch data
    }

    const getCategoryBadge = (category) => {
        const colors = {
            Ceremony: "bg-purple-100 text-purple-800",
            Panel: "bg-blue-100 text-blue-800",
            Workshop: "bg-green-100 text-green-800",
            Networking: "bg-yellow-100 text-yellow-800",
            Social: "bg-pink-100 text-pink-800",
            Exhibition: "bg-indigo-100 text-indigo-800",
        }

        return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>
    }

    return (
        <AppLayout>
            <AdminHeader
                title="Timeline Management"
                description="Manage your conference timeline and events"
                action={{
                    label: "Add Event",
                    onClick: () => (window.location.href = "/admin/timeline/create"),
                    icon: <Plus className="h-4 w-4" />,
                }}
            />

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

            <div className="space-y-4">
                {timelineEvents.map((event) => (
                    <Card key={event.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                    {getCategoryBadge(event.category)}
                                </div>
                                <p className="text-gray-600 mb-3">{event.description}</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#fd5f90]" />
                                        <span className="text-sm text-gray-500">{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-[#fd5f90]" />
                                        <span className="text-sm text-gray-500">{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-[#fd5f90]" />
                                        <span className="text-sm text-gray-500">{event.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex gap-2">
                                <Link href={`/admin/timeline/${event.id}/edit`}>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />
        </AppLayout>
    )
}

