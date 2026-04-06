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
import { Briefcase, Edit, LinkIcon, Plus, Trash2, Upload, User } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../../components/framer-modal';

export default function SpeakersPage() {
    const { speakers, editions } = usePage().props;
    const {
        data,
        setData,
        post,
        delete: destory,
        errors,
        processing,
        clearErrors,
    } = useForm({
        name: '',
        position: '',
        linkedin: '',
        image: '',
        editions: [],
    });
    const breadcrumbs = [{ title: 'Speakers', href: '/admin/speakers' }];

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSpeakers = speakers
        .filter((speaker) => (selectedEdition === null ? true : speaker.editions.some((edition) => edition.year === selectedEdition)))
        .filter((speaker) => searchQuery === '' || speaker.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleEditionChange = (edition, checked) => {
        if (checked) {
            setData((prev) => ({ ...prev, editions: [...prev.editions, edition] }));
        } else {
            setData((prev) => ({ ...prev, editions: prev.editions.filter((e) => e !== edition) }));
        }
    };

    const handleCreate = () => {
        setSelectedSpeaker(null);
        clearErrors();
        setData({
            name: '',
            position: '',
            linkedin: '',
            image: '',
            editions: [],
        });
        setFormModal(true);
    };
    const handleEdit = (speaker) => {
        const editionIDs = speaker.editions.map((item) => item.id);

        setSelectedSpeaker(speaker.id);
        clearErrors();
        setData('name', speaker.name);
        setData('position', speaker.position);
        setData('linkedin', speaker.linkedin);
        setData('image', speaker.image);
        setData('editions', editionIDs);

        setFormModal(true);
    };

    const handleDelete = (id) => {
        setSelectedSpeaker(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        destory(route('speakers.destroy', { speaker: selectedSpeaker }));
    };

    const handleForm = (e) => {
        e.preventDefault();
        const requestOptions = {
            preserveScroll: true,
            onSuccess: () => {
                setFormModal(false);
            },
        };

        if (selectedSpeaker) {
            post(
                route('speakers.update', {
                    _method: 'put',
                    data: data,
                    speaker: selectedSpeaker,
                }),
                requestOptions,
            );
        } else {
            post(route('speakers.store'), requestOptions);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader
                title="Speakers Management"
                description="Manage your conference speakers"
                action={{
                    label: 'Add Speaker',
                    onClick: () => {
                        handleCreate();
                    },
                    icon: <Plus className="h-4 w-4" />,
                }}
            />
            <Head title="Speakers" />

            <div className="mb-6 flex flex-col gap-4 md:flex-row">
                <Select value={selectedEdition} onValueChange={setSelectedEdition}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Edition" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>All Editions</SelectItem>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={edition.year}>
                                {edition.year} Edition
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex-1">
                    <Input placeholder="Search speakers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredSpeakers.map((speaker) => (
                    <Card
                        key={speaker.id}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-[#0505511f] via-[#ff006326] to-[#05055114]" />
                        <div className="relative p-5">
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md sm:h-24 sm:w-24">
                                    <img src={'/storage/' + speaker.image} className="h-full w-full object-cover" alt={speaker.name} />
                                </div>
                                <div className="flex items-center gap-2">
                                    {speaker.linkedin && (
                                        <a
                                            href={speaker.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#ff00634d] hover:text-[var(--color-beta)]"
                                            aria-label={`Open ${speaker.name} LinkedIn`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900">{speaker.name}</h3>
                            <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                <Briefcase className="h-4 w-4 text-slate-400" />
                                <span className="line-clamp-1">{speaker.position}</span>
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {speaker.editions.length > 0 ? (
                                    speaker.editions.map((edition) => (
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

                            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 cursor-pointer border-slate-300 text-slate-700 hover:bg-slate-50"
                                    onClick={() => handleEdit(speaker)}
                                >
                                    <Edit className="mr-1 h-4 w-4" />
                                    Edit
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 cursor-pointer border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => handleDelete(speaker.id)}
                                >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* If there are no speakers */}
            {speakers.length === 0 && (
                <div className="py-12 text-center">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No speakers found</h3>
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
            <FramerModal isOpen={formModal} onClose={() => setFormModal(false)}>
                <Card className="flex max-h-[calc(100dvh-1.5rem)] flex-col gap-0 overflow-hidden border-0 p-0 shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
                    <CardHeader className="relative overflow-hidden border-b px-6 py-5">
                        <div className="relative flex items-center justify-between gap-4">
                            <div>
                                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                                    {selectedSpeaker ? 'Update Speaker Profile' : 'Create New Speaker'}
                                </h2>
                                <p className="mt-1 text-sm text-slate-600">Add speaker details, photo, and conference editions.</p>
                            </div>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleForm} className="flex min-h-0 flex-1 flex-col">
                        <CardContent className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-slate-50/60 px-6 py-6">
                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">Basic Information</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="speaker-name" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                            <User size={16} /> Speaker Name
                                        </label>
                                        <Input
                                            id="speaker-name"
                                            placeholder="Enter speaker's full name"
                                            value={data.name}
                                            required
                                            className="border-slate-300 bg-white"
                                            onChange={(e) => {
                                                setData('name', e.target.value);
                                            }}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="speaker-position" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                            <Briefcase size={16} /> Speaker Position
                                        </label>
                                        <Input
                                            id="speaker-position"
                                            placeholder="Enter speaker's role or title"
                                            value={data.position}
                                            required
                                            className="border-slate-300 bg-white"
                                            onChange={(e) => {
                                                setData('position', e.target.value);
                                            }}
                                        />
                                        <InputError message={errors.position} />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="speaker-linkedin" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                            <LinkIcon size={16} /> Speaker LinkedIn
                                            <span className="text-xs font-normal text-slate-400">optional</span>
                                        </label>
                                        <Input
                                            id="speaker-linkedin"
                                            placeholder="https://www.linkedin.com/in/..."
                                            onChange={(e) => {
                                                setData('linkedin', e.target.value);
                                            }}
                                            value={data.linkedin}
                                            type="text"
                                            inputMode="url"
                                            autoComplete="url"
                                            className="border-slate-300 bg-white"
                                        />
                                        <InputError message={errors.linkedin} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Speaker Photo</h3>
                                <div className="space-y-2">
                                    <label htmlFor="image" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <Upload size={16} /> Upload image
                                    </label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="border-slate-300 bg-white file:mr-4 file:rounded file:border-0 file:bg-orange-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-orange-700 hover:file:bg-orange-200"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} />
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
                                    setFormModal(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing} className="w-full bg-slate-900 text-white hover:bg-slate-800 sm:w-auto">
                                {processing ? 'Saving...' : selectedSpeaker ? 'Update Speaker' : 'Create Speaker'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </FramerModal>
        </AppLayout>
    );
}
