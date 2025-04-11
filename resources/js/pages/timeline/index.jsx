import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import ConfirmationModal from "@/components/confirmationModal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Calendar, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from "@inertiajs/react"
import FramerModal from "../../components/framer-modal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function TimelinePage() {
    const { timelineEvents, editions } = usePage().props
    const { data, setData, post, put, delete: destroy } = useForm({
        title: '',
        date: '',
        edition: '',
        startTime: '',
        endTime: '',
        description: '',
    });


    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedEdition, setSelectedEdition] = useState(null)

    const breadcrumbs = [{ title: "Event Timeline", href: "/admin/timeline" }];

    const filteredTimelines = timelineEvents.filter((speaker) =>
        selectedEdition === null
            ? true
            : speaker.edition_id == selectedEdition
    )


    const handleCreate = () => {
        setSelectedEvent(null);
        setData({
            title: '',
            date: '',
            edition: '',
            startTime: '',
            endTime: '',
            description: '',
        })
        setFormModal(true);
    }

    const handleEdit = (event) => {
        setFormModal(true);
        setSelectedEvent(event.id);
        setData('title', event.title);
        setData('date', event.date);
        setData('edition', event.edition_id);
        setData('startTime', event.startTime);
        setData('endTime', event.endTime);
        setData('description', event.description);
    }

    const handleDelete = (id) => {
        setSelectedEvent(id)
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        destroy(route('timeline.destroy', { timeline: selectedEvent }))
    }


    const handleForm = (e) => {
        e.preventDefault();
        if (selectedEvent) {
            put(route('timeline.update', { timeline: selectedEvent }))
        } else {
            post(route('timeline.store'))
        }

        setData({
            title: '',
            date: '',
            edition: '',
            startTime: '',
            endTime: '',
            description: '',
        })
        setFormModal(false);
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader
                title="Timeline Management"
                description="Manage your conference timeline and events"
                action={{
                    label: "Add Event",
                    onClick: () => { handleCreate() },
                    icon: <Plus className="h-4 w-4" />,
                }}
            />
            <Head title="Timeline Events" />

            <div className="mb-6">
                <Select value={selectedEdition} onValueChange={setSelectedEdition}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Edition" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>
                            All Editions
                        </SelectItem>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={edition.id}>
                                {edition.year} Edition
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {filteredTimelines.map((event) => (
                    <Card key={event.id} className="p-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                </div>

                                <p className="mb-4">{event.description}</p>

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
                                <Button variant="outline" size="sm" className="flex items-center"
                                    onClick={() => handleEdit(event)}
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
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

            {/* Deletion Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />


            {/* Form Modal */}
            <FramerModal
                isOpen={formModal}
                onClose={() => setFormModal(false)}
            >


                <form onSubmit={handleForm} className="w-full lg:w-[35vw] space-y-3 p-2">
                    <h1 className="text-center text-2xl">Create A Timeline Event</h1>
                    <div className="flex flex-col gap-2 items-start">
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
                        <div className="flex flex-col gap-2 items-start">
                            <label htmlFor="date">Date</label>
                            <Input id="date" name="date" type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                required />
                        </div>

                        <div className="flex flex-col gap-2 items-start">
                            <label htmlFor="edition">Edition</label>
                            <Select value={data.edition} onValueChange={(value) => {
                                setData('edition', value)
                                const date = new Date(editions.find((item) => item.id == value).date).toISOString().split('T')[0]
                                setData('date', date);
                            }
                            }>
                                <SelectTrigger>
                                    <option value="" disabled>{data.edition ? editions.find(item => item.id == data.edition).year : 'Please Select An Edition'}</option>
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

                        <div className="flex flex-col gap-2 items-start">
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

                        <div className="flex flex-col gap-2 items-start">
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

                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="description">Event Description:</label>
                        <Textarea
                            value={data.description}
                            onChange={(e) => { setData('description', e.target.value) }}
                        />
                    </div>


                    <div className="flex justify-end">
                        <Button type="submit" className="bg-[#03329b] hover:bg-[#03329b]/90">
                            {selectedEvent ? 'Update Event' : 'Create Event'}
                        </Button>
                    </div>
                </form>

            </FramerModal>

        </AppLayout>
    )
}

