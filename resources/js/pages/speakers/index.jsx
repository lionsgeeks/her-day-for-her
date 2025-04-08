import { useState } from "react"
import ConfirmationModal from "@/components/confirmationModal"
// import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Upload, User, Briefcase, LinkIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Head, useForm, usePage } from "@inertiajs/react"
import AppLayout from '@/layouts/app-layout';
import AdminHeader from "@/components/admin-header"
import FramerModal from "../../components/framer-modal"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function SpeakersPage() {
    const { speakers, editions } = usePage().props;
    const { data, setData, post, put, delete: destory } = useForm({
        name: '',
        position: '',
        linked: '',
        image: '',
        editions: [],
    });
    const breadcrumbs = [{ title: "Speakers", href: "/admin/speakers" }];

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [formModal, setFormModal] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null)
    const [selectedEdition, setSelectedEdition] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredSpeakers = speakers
        .filter((speaker) =>
            selectedEdition === null
                ? true
                : speaker.editions.some((edition) => edition.year === selectedEdition)
        )
        .filter(
            (speaker) =>
                searchQuery === "" ||
                speaker.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )


    const handleEditionChange = (edition, checked) => {
        if (checked) {
            setData((prev) => ({ ...prev, editions: [...prev.editions, edition] }))
        } else {
            setData((prev) => ({ ...prev, editions: prev.editions.filter((e) => e !== edition) }))
        }
    }

    const handleCreate = () => {
        setSelectedSpeaker(null);
        setData({
            name: '',
            position: '',
            linked: '',
            image: '',
            editions: [],
        })
        setFormModal(true);
    }
    const handleEdit = (speaker) => {
        const editionIDs = speaker.editions.map(item => item.id);

        setSelectedSpeaker(speaker.id);
        setData('name', speaker.name);
        setData('position', speaker.position);
        setData('linked', speaker.linkedin);
        setData('image', speaker.image);
        setData('editions', editionIDs);

        setFormModal(true);

    }


    const handleDelete = (id) => {
        setSelectedSpeaker(id)
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        destory(route('speakers.destroy', { speaker: selectedSpeaker }))
    }


    const handleForm = (e) => {
        e.preventDefault();
        if (selectedSpeaker) {
            post(route('speakers.update', {
                _method: 'put',
                data: data,
                speaker: selectedSpeaker
            }))
        } else {
            post(route('speakers.store'))
        }
        setFormModal(false)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader
                title="Speakers Management"
                description="Manage your conference speakers"
                action={{
                    label: "Add Speaker",
                    onClick: () => { handleCreate() },
                    icon: <Plus className="h-4 w-4" />,
                }}
            />
            <Head title="Speakers" />

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Select value={selectedEdition} onValueChange={setSelectedEdition}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Edition" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>
                            All Editions
                        </SelectItem>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={edition.year}>
                                {edition.year} Edition
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
                {filteredSpeakers.map((speaker) => (
                    <Card key={speaker.id} className="p-6">
                        <div className="flex flex-row gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                                <img src={'/storage/' + speaker.image}
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
                                    <Button variant="outline" size="sm" className="flex items-center cursor-pointer"
                                        onClick={() => handleEdit(speaker)}
                                    >
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

            {/* If there are no speakers */}
            {speakers.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No speakers found</h3>
                    <p className="text-gray-500">Try changing your search or filter criteria</p>
                </div>
            )}

            {/* Modal for confirm Delete */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Speaker"
                message="Are you sure you want to delete this speaker? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />


            {/* Create/Edit Modal Form */}
            <FramerModal
                isOpen={formModal}
                onClose={() => setFormModal(false)}
            >

                <Card className="p-3">
                    <CardHeader className="space-y-1 p-0">
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                {
                                    selectedSpeaker ?
                                        <img src={typeof (data.image) == 'string' ? '/storage/' + data.image : URL.createObjectURL(data.image)}
                                            className="aspect-square object-cover rounded"
                                            alt={data.name}
                                        />
                                        :
                                        <img src={data.image ?
                                            URL.createObjectURL(data.image) :
                                            "https://thumbs.dreamstime.com/b/young-politician-woman-speaking-behind-podium-public-speaker-character-vector-illustration-isolated-white-background-94666836.jpg"}
                                            className="aspect-square object-cover rounded"
                                            alt="speaker_person" />
                                }
                            </div>
                        </div>
                    </CardHeader>
                    <form onSubmit={handleForm}>
                        <CardContent className="space-y-6 px-2">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="space-y-2 ">
                                    <label htmlFor="image" className="font-medium flex items-center gap-2">
                                        <Upload size={18} /> Upload Speaker Photo
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Input id="image" name="image" type="file" accept="image/*"
                                            className="border-2 rounded p-1" onChange={e => setData('image', e.target.files[0])}
                                        />
                                    </div>
                                </div>

                                {/* Speaker Name */}
                                <div className="space-y-2">
                                    <label htmlFor="speaker-name" className="font-medium flex items-center gap-2">
                                        <User size={18} /> Speaker Name
                                    </label>
                                    <Input id="speaker-name" placeholder="Enter speaker's full name"
                                        value={data.name}
                                        required
                                        onChange={(e) => { setData('name', e.target.value) }}
                                    />
                                </div>

                                {/* Speaker Position */}
                                <div className="space-y-2">
                                    <label htmlFor="speaker-position" className="font-medium flex items-center gap-2">
                                        <Briefcase size={18} /> Speaker Position
                                    </label>
                                    <Input id="speaker-position" placeholder="Enter speaker's role or title"
                                        value={data.position}
                                        required
                                        onChange={(e) => { setData('position', e.target.value) }}
                                    />
                                </div>

                                {/* Speaker LinkedIn */}
                                <div className="space-y-2">
                                    <label htmlFor="speaker-linkedin" className="font-medium flex items-center gap-2">
                                        <LinkIcon size={18} /> Speaker LinkedIn
                                    </label>
                                    <Input id="speaker-linkedin" placeholder="Enter LinkedIn profile URL"
                                        onChange={(e) => { setData('linked', e.target.value) }}
                                        value={data.linked}
                                        
                                        type="url"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="font-medium">Conference Editions</label>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    {editions.map((edition) => (
                                        <div key={edition.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`edition-${edition.id}`}
                                                checked={data.editions.includes(edition.id)}
                                                onCheckedChange={(checked) => handleEditionChange(edition.id, checked)}
                                            />
                                            <label
                                                htmlFor={`edition-${edition.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {edition.year} Edition
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" type="button"
                                onClick={() => { setFormModal(false) }}
                            >Cancel</Button>
                            <Button type="submit">Confirm</Button>
                        </CardFooter>
                    </form>
                </Card>
            </FramerModal>
        </AppLayout>
    )
}

