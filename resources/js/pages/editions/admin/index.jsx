'use client';

import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Building, Calendar, Edit, Eye, Image, MapPin, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

export default function EditionsPage() {
    const { editions } = usePage().props;
    const { delete: destroy } = useForm();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEditions = editions.filter((edition) => searchQuery === '' || edition.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleDelete = (id) => {
        setSelectedEdition(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        destroy(route('editions.destroy', { edition: selectedEdition }));
    };
    const breadcrumbs = [
        {
            title: 'Editions',
            href: '/admin/editions',
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editions" />
            <AdminHeader
                title={`${editions.length} Editions`}
                description="Manage your conference editions"
                action={{
                    label: 'Add Edition',
                    onClick: () => (window.location.href = '/admin/editions/create'),
                    icon: <Plus className="h-4 w-4" />,
                }}
            />

            <div className="mb-6">
                <Input
                    placeholder="Search editions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md border-slate-300 bg-white"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredEditions.map((edition) => (
                    <Card
                        key={edition.id}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 gap-0 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-[#0505511f] via-[#ff006326] to-[#05055114] p-5">
                            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900">{edition.name}</h3>
                            <Badge
                                className={
                                    edition.is_active
                                        ? 'border-green-200 bg-green-100 text-green-800'
                                        : 'border-slate-200 bg-slate-100 text-slate-700'
                                }
                            >
                                {edition.is_active ? 'Active' : 'Past'}
                            </Badge>
                        </div>

                        <div className="p-5">
                            <div>
                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                    <Calendar className="h-4 w-4 text-[var(--color-beta)]" />
                                    <span>{formatDate(edition.date)}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                    <MapPin className="h-4 w-4 text-[var(--color-beta)]" />
                                    <span className="line-clamp-1">
                                        {edition.venue}, {edition.city}, {edition.country}
                                    </span>
                                </div>
                            </div>
                            {/* </div> */}

                            <div className="grid grid-cols-2 gap-3 mt-5">
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                    <Users className="mx-auto mb-1 h-4 w-4 text-[var(--color-alpha)]" />
                                    <p className="text-base font-semibold text-slate-900">{edition.registrations?.length ?? 0}</p>
                                    <p className="text-xs text-slate-500">Registrations</p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                    <Users className="mx-auto mb-1 h-4 w-4 text-[var(--color-beta)]" />
                                    <p className="text-base font-semibold text-slate-900">{edition.speakers?.length ?? 0}</p>
                                    <p className="text-xs text-slate-500">Speakers</p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                    <Building className="mx-auto mb-1 h-4 w-4 text-[var(--color-alpha)]" />
                                    <p className="text-base font-semibold text-slate-900">{edition.sponsors?.length ?? 0}</p>
                                    <p className="text-xs text-slate-500">Sponsors</p>
                                </div>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                                    <Image className="mx-auto mb-1 h-4 w-4 text-[var(--color-beta)]" />
                                    <p className="text-base font-semibold text-slate-900">{edition.galleries?.length ?? 0}</p>
                                    <p className="text-xs text-slate-500">Gallery Sets</p>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                                <Link href={`/admin/editions/${edition.id}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
                                        <Eye className="mr-1 h-4 w-4" />
                                        View
                                    </Button>
                                </Link>
                                <Link href={`/admin/editions/${edition.id}/edit`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => handleDelete(edition.id)}
                                >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredEditions.length === 0 && (
                <div className="py-12 text-center">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No editions found</h3>
                    <p className="text-gray-500">Try changing your search criteria or add a new edition</p>
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Edition"
                message="Are you sure you want to delete this edition? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />
        </AppLayout>
    );
}
