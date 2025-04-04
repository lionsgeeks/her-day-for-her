import { useState } from "react"
import ConfirmationModal from "@/components/confirmationModal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm, usePage } from "@inertiajs/react"
import AppLayout from '@/layouts/app-layout';
import AdminHeader from "@/components/admin-header"
import FramerModal from "../../components/framer-modal"

export default function SpeakersPage() {
    const { speakers } = usePage().props;
    const { delete: destory } = useForm();

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

    const confirmDelete = () => {
        destory(route('speakers.destroy', { speaker: selectedSpeaker }))
    }

    const { data, setData, post } = useForm({
        name: '',
        position: '',
        linked: '',
        image: '',
    });


    const handleForm = (e) => {
        e.preventDefault();
        post(route('speakers.store'))
        setFormModal(false)
    }

    return (
        <AppLayout>
            <AdminHeader
                title="Speakers Management"
                description="Manage your conference speakers"
                action={{
                    label: "Add Speaker",
                    onClick: () => (setFormModal(true)),
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
                                    {/* TODO edit is going to open the creation modal but this time with speaker's info */}
                                    <Button variant="outline" size="sm" className="flex items-center cursor-pointer">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
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


            <FramerModal
                isOpen={formModal}
                onClose={() => setFormModal(false)}
            >
                <form onSubmit={handleForm} >
                    {/* Speaker Image */}
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="w-32 h-32 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                            <img src={data.image ?
                                URL.createObjectURL(data.image) :
                                "https://thumbs.dreamstime.com/b/young-politician-woman-speaking-behind-podium-public-speaker-character-vector-illustration-isolated-white-background-94666836.jpg"}
                                className="aspect-square object-cover"
                                alt="speaker_person" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 invisible">Current Profile Photo</h3>
                            <div className="space-y-2">
                                <label htmlFor="photo" className=" p-2 rounded-l-lg bg-alpha text-white">Upload New Photo
                                </label>
                                <Input id="photo" name="photo" type="file" accept="image/*"
                                    className="border-2 p-1 rounded-r-lg" onChange={e => setData('image', e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Speaker Name */}
                        <div className="flex items-start flex-col gap-2">
                            <label htmlFor="speakerName">Speaker Name:</label>
                            <Input
                                type="text"
                                name="speakerName"
                                id="speakerName"
                                className="border-2 rounded w-full p-1"
                                placeholder="Speaker Name"
                                value={data.name}
                                onChange={(e) => { setData('name', e.target.value) }}
                            />
                        </div>

                        {/* Speaker Position */}
                        <div className="flex items-start flex-col gap-2">
                            <label htmlFor="speakerPosition">Speaker Position:</label>
                            <Input
                                type="text"
                                name="speakerPosition"
                                id="speakerPosition"
                                className="border-2 rounded w-full p-1"
                                placeholder="Speaker Role"
                                value={data.position}
                                onChange={(e) => { setData('position', e.target.value) }}
                            />
                        </div>

                        {/* Speaker LinkedIn */}
                        <div className="flex items-start flex-col gap-2">
                            <label htmlFor="speakerLinked">Speaker LinkedIn:</label>
                            <Input
                                type="url"
                                name="speakerLinked"
                                id="speakerLinked"
                                className="border-2 rounded w-full p-1"
                                placeholder="Speaker LinkedIn URL"
                                value={data.linked}
                                onChange={(e) => { setData('linked', e.target.value) }}
                            />
                        </div>
                    </div>


                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" variant="outline" onClick={() => { setFormModal(false) }}>
                            Cancel
                        </button>
                        <Button
                            className="bg-alpha"
                        >
                            Confirm
                        </Button>
                    </div>
                </form>
            </FramerModal>
        </AppLayout>
    )
}

