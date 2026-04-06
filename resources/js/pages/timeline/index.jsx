import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Calendar, Clock, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../../components/framer-modal';

export default function TimelinePage() {
    const { timelineEvents, editions } = usePage().props;
    const {
        data,
        setData,
        post,
        put,
        errors,
        processing,
        clearErrors,
        delete: destroy,
    } = useForm({
        title: '',
        date: '',
        edition: '',
        startTime: '',
        endTime: '',
        description: '',
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState('all');

    const breadcrumbs = [{ title: 'Event Timeline', href: '/admin/timeline' }];

    const filteredTimelines = timelineEvents.filter((event) => (selectedEdition === 'all' ? true : String(event.edition_id) === selectedEdition));

    const handleCreate = () => {
        setSelectedEvent(null);
        clearErrors();
        setData({
            title: '',
            date: '',
            edition: '',
            startTime: '',
            endTime: '',
            description: '',
        });
        setFormModal(true);
    };

    const handleEdit = (event) => {
        setFormModal(true);
        setSelectedEvent(event.id);
        clearErrors();
        setData('title', event.title);
        setData('date', event.date);
        setData('edition', String(event.edition_id));
        setData('startTime', event.startTime);
        setData('endTime', event.endTime);
        setData('description', event.description);
    };

    const handleDelete = (id) => {
        setSelectedEvent(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        destroy(route('timeline.destroy', { timeline: selectedEvent }));
    };

    const handleForm = (e) => {
        e.preventDefault();
        const requestOptions = {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    title: '',
                    date: '',
                    edition: '',
                    startTime: '',
                    endTime: '',
                    description: '',
                });
                setFormModal(false);
            },
        };

        if (selectedEvent) {
            put(route('timeline.update', { timeline: selectedEvent }), requestOptions);
        } else {
            post(route('timeline.store'), requestOptions);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader
                title="Timeline"
                description="Manage your conference timeline and events"
                action={{
                    label: 'Add Event',
                    onClick: () => {
                        handleCreate();
                    },
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
                        <SelectItem value="all">All Editions</SelectItem>
                        {editions.map((edition) => (
                            <SelectItem key={edition.id} value={String(edition.id)}>
                                {edition.year} Edition
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredTimelines.map((event) => (
                    <Card
                        key={event.id}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative flex h-full flex-col">
                            <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#0505511f] via-[#ff006326] to-[#05055114] p-5">
                                <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900">{event.title}</h3>
                                <span className="inline-flex items-center rounded-full border border-[#ff00633b] bg-[#ff006314] px-2.5 py-1 text-xs font-medium text-[var(--color-beta)]">
                                    {editions.find((item) => item.id === event.edition_id)?.year ?? 'Edition'}
                                </span>
                            </div>

                            <div className="mt-4 flex flex-col gap-2 px-5 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-[var(--color-beta)]" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-[var(--color-beta)]" />
                                    <span>
                                        {event.startTime} - {event.endTime}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 p-5">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                                    onClick={() => handleEdit(event)}
                                >
                                    <Edit className="mr-1 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    <Trash2 className="mr-1 h-4 w-4" />
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
            <FramerModal isOpen={formModal} onClose={() => setFormModal(false)}>
                <Card className="flex max-h-[calc(100dvh-1.5rem)] flex-col gap-0 overflow-hidden border-0 p-0 shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
                    <CardHeader className="relative overflow-hidden border-b px-6 py-5">
                        <div>
                            <h2 className="mt-1 text-xl font-semibold text-slate-900">
                                {selectedEvent ? 'Update Timeline Event' : 'Create Timeline Event'}
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">Add details for agenda title, timing, and description.</p>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleForm} className="flex min-h-0 flex-1 flex-col">
                        <CardContent className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-slate-50/60 px-6 py-6">
                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">Event Information</h3>
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium text-slate-700">
                                        Event Title
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => {
                                            setData('title', e.target.value);
                                        }}
                                        placeholder="e.g. Opening Ceremony"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">Schedule</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="edition" className="text-sm font-medium text-slate-700">
                                            Edition
                                        </label>
                                        <Select
                                            value={String(data.edition || '')}
                                            onValueChange={(value) => {
                                                setData('edition', value);
                                                const selected = editions.find((item) => String(item.id) === String(value));
                                                if (selected?.date) {
                                                    const date = new Date(selected.date).toISOString().split('T')[0];
                                                    setData('date', date);
                                                }
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Please Select An Edition" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {editions.map((edition) => (
                                                    <SelectItem key={edition.id} value={String(edition.id)}>
                                                        {edition.year} Edition
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.edition} />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="date" className="text-sm font-medium text-slate-700">
                                            Date
                                        </label>
                                        <Input
                                            id="date"
                                            name="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.date} />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="startTime" className="text-sm font-medium text-slate-700">
                                            Start Time
                                        </label>
                                        <Input
                                            id="startTime"
                                            name="startTime"
                                            type="time"
                                            value={data.startTime}
                                            onChange={(e) => {
                                                setData('startTime', e.target.value);
                                            }}
                                            required
                                        />
                                        <InputError message={errors.startTime} />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="endTime" className="text-sm font-medium text-slate-700">
                                            End Time
                                        </label>
                                        <Input
                                            id="endTime"
                                            name="endTime"
                                            type="time"
                                            value={data.endTime}
                                            onChange={(e) => {
                                                setData('endTime', e.target.value);
                                            }}
                                            required
                                        />
                                        <InputError message={errors.endTime} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Description</h3>
                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium text-slate-700">
                                        Event Description
                                    </label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => {
                                            setData('description', e.target.value);
                                        }}
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t bg-white px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    clearErrors();
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
                                {processing ? 'Saving...' : selectedEvent ? 'Update Event' : 'Create Event'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </FramerModal>
        </AppLayout>
    );
}
