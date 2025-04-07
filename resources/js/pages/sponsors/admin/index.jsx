import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../../../components/framer-modal';

export default function SponsorsPage() {
    const { sponsors, editions } = usePage().props;
    console.log('sponsors', sponsors);
    const {
        data,
        setData,
        post,
        progress,
        delete: destroy,
    } = useForm({
        logo: null,
        name: '',
        editions: [],
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [formModal, setFormModal] = useState(false);
    console.log('edition', selectedEdition);
    // Mock data - in a real app, this would come from your API

    const filteredSponsors = sponsors
        .filter((sponsor) => selectedEdition === 'all' || sponsor.editions.some((edition) => edition.year === selectedEdition))
        .filter((sponsor) => searchQuery === '' || sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleDelete = (id) => {
        setSelectedSponsor(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        destroy(route('sponsors.destroy', { sponsor: selectedSponsor }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sponsors.store'), {
            onFinish: () => {
                setFormModal(false);
                setData({
                    logo: null,
                    name: '',
                    editions: [],
                });
            },
        });
    };

    const handleEditionChange = (edition, checked) => {
        if (checked) {
            setData((prev) => ({ ...prev, editions: [...prev.editions, edition] }));
        } else {
            setData((prev) => ({ ...prev, editions: prev.editions.filter((e) => e !== edition) }));
        }
    };
    const breadcrumbs = [
        {
            title: 'Sponsors',
            href: `/admin/sponsors`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sponsors" />
            <AdminHeader
                title="Sponsors Management"
                description="Manage your sponsors"
                action={{
                    label: 'Add Sponsor',
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
                        <SelectItem value={'all'}>All Editions</SelectItem>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={edition.year}>
                                {`${edition.year}  Edition`}
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
                            <div className="relative mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={`/storage/${sponsor.images[0]?.path}`}
                                    alt={sponsor.name}
                                    fill
                                    className="aspect-square w-full object-cover"
                                />
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
                <form onSubmit={handleSubmit} className="p-5">
                    {/* Speaker Image */}
                    <div className="md:flex- mb-6 flex flex-col gap-6 lg:px-5">
                        <div className="flex-1">
                            <h3 className="invisible mb-2 text-lg font-semibold">Sponsor Logo</h3>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="logo"
                                    className="bg-alpha cursor-pointer rounded-lg px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-800"
                                >
                                    Upload Logo
                                </label>
                                <input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setData('logo', e.target.files[0])}
                                />
                                <span className="text-sm text-gray-600">{data.logo ? data.logo.name : 'No file chosen'}</span>
                            </div>
                        </div>
                        {data.logo && (
                            <div className="relative mx-auto h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg md:mx-0">
                                <img src={URL.createObjectURL(data.logo)} className="aspect-square object-cover" alt="speaker_person" />
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
                    <div className="space-y-3">
                        <label className="font-medium">Conference Editions</label>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                            {editions.map((edition) => (
                                <div key={edition.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`edition-${edition.id}`}
                                        checked={data.editions.includes(edition.id)}
                                        onCheckedChange={(checked) => handleEditionChange(edition.id, checked)}
                                    />
                                    <label
                                        htmlFor={`edition-${edition.id}`}
                                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {edition.year} Edition
                                    </label>
                                </div>
                            ))}
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
