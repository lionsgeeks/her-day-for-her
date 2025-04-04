import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Edit, Eye, Image, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
// import Image from "next/image"
// import Link from "next/link"
import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import FramerModal from '../../../components/framer-modal';

export default function SponsorsPage() {
  const { sponsors, image_url } = usePage().props;
  console.log('sponsors', sponsors)
    const { data, setData, post, progress, delete : destroy,  } = useForm({
        logo: null,
        name: '',
        // edition_id: 1
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [formModal, setFormModal] = useState(false);

    // Mock data - in a real app, this would come from your API
    const editions = ['all', '2025', '2024', '2023', '2022'];

    // const sponsors = [
    //     {
    //         id: 1,
    //         name: 'TechCorp Global',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025', '2024', '2023'],
    //     },
    //     {
    //         id: 2,
    //         name: 'InnovateTech',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025', '2024'],
    //     },
    //     {
    //         id: 3,
    //         name: 'Future Systems',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025'],
    //     },
    //     {
    //         id: 4,
    //         name: 'Digital Innovations',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025', '2023'],
    //     },
    //     {
    //         id: 5,
    //         name: 'Tech Solutions Inc.',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025'],
    //     },
    //     {
    //         id: 6,
    //         name: 'CloudTech Partners',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025', '2024'],
    //     },
    //     {
    //         id: 7,
    //         name: 'DataSphere',
    //         logo: '/placeholder.svg?height=200&width=200',
    //         editions: ['2025'],
    //     },
    // ];

    const filteredSponsors = sponsors
        // .filter((sponsor) => selectedEdition === 'all' || sponsor.editions.includes(selectedEdition))
        .filter((sponsor) => searchQuery === '' || sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleDelete = (id) => {
      setSelectedSponsor(id);
      setDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
      console.log("delete ", selectedSponsor)
        destroy(route('sponsors.destroy', { sponsor: selectedSponsor }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sponsors.store'));
    };
    return (
        <AppLayout>
            <Head title="Sponsors" />
            <AdminHeader
                title="Sponsors Management"
                description="Manage your sponsors"
                action={{
                    label: 'Add Speaker',
                    onClick: () => setFormModal(true),
                    icon: <Plus className="h-4 w-4" />,
                }}
            />

            <div className="mb-6 flex flex-col gap-4 md:flex-row">
                <Select value={selectedEdition} onValueChange={setSelectedEdition}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Edition" />
                    </SelectTrigger>
                    <SelectContent>
                        {editions.map((edition) => (
                            <SelectItem key={edition} value={edition}>
                                {edition === 'all' ? 'All Editions' : `${edition} Edition`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex-1">
                    <Input placeholder="Search sponsors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {filteredSponsors?.map((sponsor) => (
                    <Card key={sponsor.id} className="overflow-hidden">
                        <div className="flex flex-col items-center p-4">
                            <div className="relative mb-4  overflow-hidden rounded-lg">
                                <img src={`${image_url}/${sponsor.images[0]?.path}`} alt={sponsor.name} fill className="object-contain" />
                            </div>
                            <h3 className="mb-2 text-center text-lg font-bold">{sponsor.name}</h3>
                            {/* <div className="mb-4 flex flex-wrap justify-center gap-1">
                                {sponsor.editions.map((edition) => (
                                    <Badge key={edition} variant="outline" className="border-[#03329b]/30 bg-[#03329b]/10 text-[#03329b]">
                                        {edition}
                                    </Badge>
                                ))}
                            </div> */}
                            <div className="mt-auto flex gap-2">
                                {/* <Link href={`/admin/sponsors/${sponsor.id}`}>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Eye className="mr-1 h-4 w-4" />
                                        View
                                    </Button>
                                </Link>
                                <Link href={`/admin/sponsors/${sponsor.id}/edit`}>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link> */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center border-red-200 text-red-600 hover:bg-red-50"
                                    onClick={() => handleDelete(sponsor.id)}
                                >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredSponsors.length === 0 && (
                <div className="py-12 text-center">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No sponsors found</h3>
                    <p className="text-gray-500">Try changing your search or filter criteria</p>
                </div>
            )}

            <FramerModal isOpen={formModal} onClose={() => setFormModal(false)}>
                <form onSubmit={handleSubmit}>
                    {/* Speaker Image */}
                    <div className="md:flex- mb-6 flex flex-col gap-6">
                        <div className="flex-1">
                            <h3 className="invisible mb-2 text-lg font-semibold">Sponsor Logo</h3>
                            <div className="space-y-2">
                                <label htmlFor="logo" className="bg-alpha rounded-l-lg p-2 text-white">
                                    Upload Logo
                                </label>
                                <Input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    className="rounded-r-lg border-2 p-1"
                                    onChange={(e) => setData('logo', e.target.files[0])}
                                />
                            </div>
                        </div>
                        {data.image && (
                            <div className="relative mx-auto h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg md:mx-0">
                                <img src={URL.createObjectURL(data.image)} className="aspect-square object-cover" alt="speaker_person" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Speaker Name */}
                        <div className="flex flex-col items-start gap-2">
                            <label htmlFor="sponsorName">Sponsor Name:</label>
                            <Input
                                type="text"
                                name="sponsorName"
                                id="sponsorName"
                                className="w-full rounded border-2 p-1"
                                placeholder="Sponsor Name"
                                value={data.name}
                                onChange={(e) => {
                                    setData('name', e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setFormModal(false);
                            }}
                        >
                            Cancel
                        </button>
                        <Button type="submit" className="bg-alpha">
                            Confirm
                        </Button>
                    </div>
                </form>
            </FramerModal>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Sponsor"
                message="Are you sure you want to delete this speaker? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />
        </AppLayout>
    );
}
