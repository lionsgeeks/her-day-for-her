import { useState } from "react"
import ConfirmationModal from "./components/confirmationModal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Link, usePage } from "@inertiajs/react"
import AppLayout from '@/layouts/app-layout';
import SpeakerModal from "./components/speakerModal"

export default function SpeakersPage() {
    const { speakers } = usePage().props;
    console.log(speakers);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [formModal, setFormModal] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null)
    const [selectedEdition, setSelectedEdition] = useState("2025")
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data - in a real app, this would come from your API
    const editions = ["2025", "2024", "2023", "2022"]


    // const filteredSpeakers = speakers
    //     .filter((speaker) => speaker.editions.includes(selectedEdition))
    //     .filter(
    //         (speaker) =>
    //             searchQuery === "" ||
    //             speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             speaker.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             speaker.topic.toLowerCase().includes(searchQuery.toLowerCase()),
    //     )

    const handleDelete = (id) => {
        setSelectedSpeaker(id)
        setDeleteModalOpen(true)
    }

    const handleCreate = () => {
        setFormModal(true);
    }

    const confirmDelete = () => {
        // In a real app, you would call your API to delete the speaker
        console.log(`Deleting speaker ${selectedSpeaker}`)
        // Then update your local state or refetch data
    }

    const AdminHeader = ({ title, description, action }) => {
        return (
            <div className="flex flex-col md:flex-row md:items-center justify-between my-3 pb-4 border-b">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
                </div>
                {action && (
                    <div className="mt-4 md:mt-0">
                        <Button onClick={action.onClick} className="bg-[#03329b] hover:bg-[#03329b]/90">
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.label}
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <AppLayout>
            <AdminHeader
                title="Speakers Management"
                description="Manage your conference speakers"
                action={{
                    label: "Add Speaker",
                    onClick: () => (handleCreate()),
                    icon: <Plus className="h-4 w-4" />,
                }}
            />

            <div className="flex flex-col md:flex-row gap-4 mb-6">
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

                <div className="flex-1">
                    <Input
                        placeholder="Search speakers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {speakers.map((speaker) => (
                    <Card key={speaker.id} className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                                <img src={'http://127.0.0.1:8000/storage/' + speaker.image}
                                    className="w-full h-full object-cover"
                                    alt={speaker.name} />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{speaker.name}</h3>
                                    <div className="flex gap-2 mt-2 md:mt-0">
                                        {speaker.linkedin && (
                                            <a
                                                href={speaker.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-500 hover:text-[#0077b5]"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    {speaker.position}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {/* edit is going to open the creation modal but this time with speaker's info */}
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                        onClick={() => handleDelete(speaker.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {speakers.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No speakers found</h3>
                    <p className="text-gray-500">Try changing your search or filter criteria</p>
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Speaker"
                message="Are you sure you want to delete this speaker? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />

            <SpeakerModal
                isOpen={formModal}
                onClose={() => setFormModal(false)}
            />
        </AppLayout>
    )
}

