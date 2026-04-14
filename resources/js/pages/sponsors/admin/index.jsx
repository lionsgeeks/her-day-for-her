import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../../../components/framer-modal';

export default function SponsorsPage() {
    const { sponsors, editions } = usePage().props;
    const {
        data,
        setData,
        post,
        errors,
        processing,
        clearErrors,
        delete: destroy,
    } = useForm({
        logo: null,
        name: '',
        editions: [],
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const [sponsorToDelete, setSponsorToDelete] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [formModal, setFormModal] = useState(false);

    const filteredSponsors = sponsors
        .filter((sponsor) => selectedEdition === 'all' || sponsor.editions.some((edition) => String(edition.year) === selectedEdition))
        .filter((sponsor) => searchQuery === '' || sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleDelete = (id) => {
        setSponsorToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleEdit = (sponsor) => {
        clearErrors();
        setSelectedSponsor(sponsor.id);
        setData({
            name: sponsor.name,
            logo: sponsor.images[0]?.path ?? sponsor.logo ?? null,
            editions: sponsor.editions.map((edition) => edition.id),
        });
        setFormModal(true);
    };

    const confirmDelete = () => {
        destroy(route('sponsors.destroy', { sponsor: sponsorToDelete }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            preserveScroll: true,
            onSuccess: () => {
                setFormModal(false);
                setSelectedSponsor(null);
                setData({
                    logo: null,
                    name: '',
                    editions: [],
                });
            },
        };

        if (selectedSponsor) {
            post(
                route('sponsors.update', {
                    _method: 'put',
                    sponsor: selectedSponsor,
                }),
                requestOptions,
            );
        } else {
            post(route('sponsors.store'), requestOptions);
        }
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
                title={`${sponsors.length} Sponsors`}
                description="Manage your sponsors"
                action={{
                    label: 'Add Sponsor',
                    onClick: () => {
                        clearErrors();
                        setSelectedSponsor(null);
                        setData({
                            logo: null,
                            name: '',
                            editions: [],
                        });
                        setFormModal(true);
                    },
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredSponsors?.map((sponsor) => (
                    <Card
                        key={sponsor.id}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-[#0505511f] via-[#ff006326] to-[#05055114]" />
                        <div className="relative flex h-full flex-col p-5">
                            <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-xl border-2 border-white shadow-md">
                                <img src={`/storage/${sponsor.images[0]?.path}`} alt={sponsor.name} className="aspect-square w-full object-cover" />
                            </div>
                            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900">{sponsor.name}</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {sponsor.editions.length > 0 ? (
                                    sponsor.editions.map((edition) => (
                                        <span
                                            key={edition.id}
                                            className="inline-flex items-center rounded-full border border-[#ff00633b] bg-[#ff006314] px-2.5 py-1 text-xs font-medium text-[var(--color-beta)]"
                                        >
                                            {edition.year}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-400">No editions assigned</span>
                                )}
                            </div>
                            <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50"
                                    onClick={() => handleEdit(sponsor)}
                                >
                                    <Edit className="mr-1 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full cursor-pointer border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
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
                <Card className="flex max-h-[calc(100dvh-1.5rem)] flex-col gap-0 overflow-hidden border-0 p-0 shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
                    <CardHeader className="relative overflow-hidden border-b px-6 py-5">
                        <div className="relative flex items-center justify-between gap-4">
                            <div>
                                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                                    {selectedSponsor ? 'Update Sponsor' : 'Create New Sponsor'}
                                </h2>
                                <p className="mt-1 text-sm text-slate-600">Add sponsor name, logo, and conference editions.</p>
                            </div>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                        <CardContent className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-slate-50/60 px-6 py-6">
                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">Sponsor Name</h3>
                                <div className="space-y-2">
                                    <label htmlFor="sponsorName" className="text-sm font-medium text-slate-700">
                                        Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="sponsorName"
                                        id="sponsorName"
                                        className="w-full border-slate-300 bg-white"
                                        placeholder="Sponsor Name"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData('name', e.target.value);
                                        }}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <div className="mb-3 flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">Sponsor Logo</h3>
                                        <label htmlFor="logo" className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                                            <Upload size={16} /> Upload logo
                                        </label>
                                    </div>

                                    {data.logo && (
                                        <div className="relative size-12 overflow-hidden rounded-xl border border-slate-200">
                                            <img
                                                src={typeof data.logo === 'string' ? `/storage/${data.logo}` : URL.createObjectURL(data.logo)}
                                                className="h-full w-full object-cover"
                                                alt="sponsor_logo_preview"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Input
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        accept="image/*"
                                        className="border-slate-300 bg-white file:mr-4 file:rounded file:border-0 file:bg-[#ff006314] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[var(--color-beta)] hover:file:bg-[#ff006326]"
                                        onChange={(e) => setData('logo', e.target.files[0])}
                                    />
                                    <InputError message={errors.logo} />
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Conference Editions</h3>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {editions.map((edition) => (
                                        <label
                                            key={edition.id}
                                            htmlFor={`edition-${edition.id}`}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 transition-colors hover:bg-slate-50"
                                        >
                                            <Checkbox
                                                id={`edition-${edition.id}`}
                                                checked={data.editions.includes(edition.id)}
                                                onCheckedChange={(checked) => handleEditionChange(edition.id, checked)}
                                            />
                                            <span className="text-sm font-medium text-slate-700">{edition.year} Edition</span>
                                        </label>
                                    ))}
                                </div>
                                <InputError className="mt-2" message={errors.editions} />
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t bg-white px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    clearErrors();
                                    setSelectedSponsor(null);
                                    setFormModal(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[var(--color-alpha)] text-white hover:bg-[#040442] sm:w-auto"
                            >
                                {processing ? 'Saving...' : selectedSponsor ? 'Update Sponsor' : 'Create Sponsor'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </FramerModal>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Sponsor"
                message="Are you sure you want to delete this sponsor? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />
        </AppLayout>
    );
}
