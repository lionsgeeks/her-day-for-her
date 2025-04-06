'use client';

import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Building, Calendar, Edit, Eye, Image, MapPin, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

export default function EditionsPage() {
    const { editions } = usePage().props;
    const { delete: destroy } = useForm();
    console.log(editions);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEditions = editions.filter(
        (edition) =>
            searchQuery === '' ||
            // edition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edition.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            edition.year.includes(searchQuery),
    );

    const handleDelete = (id) => {
        setSelectedEdition(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        console.log(`Deleting edition ${selectedEdition}`);
        destroy(route('editions.destroy', { edition: selectedEdition }));
        // Then update your local state or refetch data
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <AppLayout>
            <AdminHeader
                title="Editions Management"
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
                    className="max-w-md bg-white"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredEditions.map((edition) => (
                    <Card key={edition.id} className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{edition.name}</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            {formatDate(edition.date)}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            {edition.venue}, {edition.location}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <Badge className={edition.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                        {edition.is_active ? 'Active' : 'Past'}
                                    </Badge>
                                </div>
                            </div>

                            <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="flex flex-col items-center rounded-md bg-gray-50 p-3">
                                    <Users className="mb-1 h-5 w-5 text-[#03329b]" />
                                    <span className="text-lg font-semibold">{edition.registrations?.length}</span>
                                    <span className="text-xs text-gray-500">Registrations</span>
                                </div>
                                <div className="flex flex-col items-center rounded-md bg-gray-50 p-3">
                                    <Users className="mb-1 h-5 w-5 text-[#fd5f90]" />
                                    <span className="text-lg font-semibold">{edition.speakers?.length}</span>
                                    <span className="text-xs text-gray-500">Speakers</span>
                                </div>
                                <div className="flex flex-col items-center rounded-md bg-gray-50 p-3">
                                    <Building className="mb-1 h-5 w-5 text-[#03329b]" />
                                    <span className="text-lg font-semibold">{edition.sponsors.length}</span>
                                    <span className="text-xs text-gray-500">Sponsors</span>
                                </div>
                                <div className="flex flex-col items-center rounded-md bg-gray-50 p-3">
                                    <Image className="mb-1 h-5 w-5 text-[#fd5f90]" />
                                    <span className="text-lg font-semibold">{edition.galleries?.length}</span>
                                    <span className="text-xs text-gray-500">Gallery Items</span>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <Link href={`/admin/editions/${edition.id}`}>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Eye className="mr-1 h-4 w-4" />
                                        View Details
                                    </Button>
                                </Link>
                                <Link href={`/admin/editions/${edition.id}/edit`}>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center border-red-200 text-red-600 hover:bg-red-50"
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
                message="Are you sure you want to delete this speaker? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />
        </AppLayout>
    );
}
