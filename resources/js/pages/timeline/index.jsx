import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import ConfirmationModal from "@/components/confirmationModal"


import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from "@inertiajs/react"
import FramerModal from "../../components/framer-modal"
import { Input } from "@/components/ui/input"

export default function TimelinePage() {
    const {timelineEvents} = usePage().props

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedEdition, setSelectedEdition] = useState("2025")

    // Mock data - in a real app, this would come from your API
    const editions = ["2025", "2024", "2023", "2022"]

    // const timelineEvents = [
    //     {
    //         id: 1,
    //         title: "Opening Ceremony",
    //         description: "Join us for the official opening with keynote speeches from industry leaders.",
    //         date: "June 15, 2025",
    //         time: "09:00 - 10:30",
    //         location: "Main Hall",
    //         category: "Ceremony",
    //     },
    //     {
    //         id: 2,
    //         title: "Women in Tech Panel",
    //         description: "Engaging discussions on women's leadership in technology and innovation.",
    //         date: "June 15, 2025",
    //         time: "11:00 - 12:30",
    //         location: "Panel Room A",
    //         category: "Panel",
    //     },
    //     {
    //         id: 3,
    //         title: "Networking Lunch",
    //         description: "Connect with peers and speakers in a relaxed environment.",
    //         date: "June 15, 2025",
    //         time: "12:30 - 14:00",
    //         location: "Dining Hall",
    //         category: "Networking",
    //     },
    //     {
    //         id: 4,
    //         title: "AI in Healthcare Workshop",
    //         description: "Interactive session on the latest AI applications in healthcare.",
    //         date: "June 15, 2025",
    //         time: "14:30 - 16:00",
    //         location: "Workshop Room B",
    //         category: "Workshop",
    //     },
    //     {
    //         id: 5,
    //         title: "Evening Reception",
    //         description: "Celebrate the first day with drinks, canapés, and entertainment.",
    //         date: "June 15, 2025",
    //         time: "18:00 - 20:00",
    //         location: "Rooftop Terrace",
    //         category: "Social",
    //     },
    //     {
    //         id: 6,
    //         title: "Leadership Masterclass",
    //         description: "Develop your leadership skills with this hands-on masterclass.",
    //         date: "June 16, 2025",
    //         time: "09:00 - 11:00",
    //         location: "Workshop Room A",
    //         category: "Workshop",
    //     },
    //     {
    //         id: 7,
    //         title: "Tech Showcase",
    //         description: "Demonstrations of cutting-edge technologies and innovations.",
    //         date: "June 16, 2025",
    //         time: "11:30 - 13:00",
    //         location: "Exhibition Hall",
    //         category: "Exhibition",
    //     },
    //     {
    //         id: 8,
    //         title: "Closing Ceremony",
    //         description: "Celebrate the success of the conference and future opportunities.",
    //         date: "June 17, 2025",
    //         time: "16:00 - 17:30",
    //         location: "Main Hall",
    //         category: "Ceremony",
    //     },
    // ]

    const handleDelete = (id) => {
        setSelectedEvent(id)
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        // In a real app, you would call your API to delete the event
        console.log(`Deleting event ${selectedEvent}`)
        // Then update your local state or refetch data
    }

    const { data, setData, post } = useForm({
        title: '',
        date: '',
        edition: '',
        startTime: '',
        endTime: '',
    });

    const handleForm = (e) => {
        e.preventDefault();
        post(route('timeline.store'));
        setFormModal(false);
    }


    return (
        <AppLayout>
            <AdminHeader
                title="Timeline Management"
                description="Manage your conference timeline and events"
                action={{
                    label: "Add Event",
                    onClick: () => (setFormModal(true)),
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

            <div className="grid grid-cols-3 gap-3">
                {timelineEvents.map((event) => (
                    <Card key={event.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#fd5f90]" />
                                        <span className="text-sm text-gray-500">{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-[#fd5f90]" />
                                        <span className="text-sm text-gray-500">{event.startTime} - {event.endTime}</span>
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



            <FramerModal
                isOpen={formModal}
                onClose={() => setFormModal(false)}
            >


                <form onSubmit={handleForm} className="space-y-6 w-[30vw]">
                    <div className="space-y-2">
                        <label htmlFor="title">Event Title</label>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => { setData('title', e.target.value) }}
                            placeholder="e.g. Opening Ceremony"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <label htmlFor="date">Date</label>
                            <Input id="date" name="date" type="date" value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="edition">Edition</label>
                            <Select value={data.edition} onValueChange={(value) => setData('edition', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select edition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2025">2025 Edition</SelectItem>
                                    <SelectItem value="2024">2024 Edition</SelectItem>
                                    <SelectItem value="2023">2023 Edition</SelectItem>
                                    <SelectItem value="2022">2022 Edition</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <label htmlFor="startTime">Start Time</label>
                            <Input
                                id="startTime"
                                name="startTime"
                                type="time"
                                value={data.startTime}
                                onChange={(e) => { setData('startTime', e.target.value) }}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="endTime">End Time</label>
                            <Input
                                id="endTime"
                                name="endTime"
                                type="time"
                                value={data.endTime}
                                onChange={(e) => { setData('endTime', e.target.value) }}
                                required
                            />
                        </div>
                    </div>


                    <div className="flex justify-end">
                        <Button type="submit" className="bg-[#03329b] hover:bg-[#03329b]/90">
                            Create Event
                        </Button>
                    </div>
                </form>

            </FramerModal>

        </AppLayout>
    )
}

