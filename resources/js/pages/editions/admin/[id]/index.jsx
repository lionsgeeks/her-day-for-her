'use client';
import AdminHeader from '@/components/admin-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Building, Calendar, Clock, Edit, Image, MapPin, Users } from 'lucide-react';
import EditionTabs from '../../../../components/edition-tabsDetails';

export default function EditionDetailsPage() {
    const { edition } = usePage().props;
    console.log(edition);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <AppLayout>
            <AdminHeader title="Edition Details" description={`Viewing details for ${edition.name}`} />

            <Link href="/admin/editions" className="mb-6 inline-flex items-center text-sm text-[#03329b] hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Editions
            </Link>

            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="p-6 lg:col-span-2">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{edition.name}</h2>
                            <div className="mt-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-600">{formatDate(edition.date)}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge className={edition.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {edition.is_active ? 'Active' : 'Past'}
                            </Badge>
                            <Link href={`/admin/editions/${edition.id}/edit`}>
                                <Button variant="outline" size="sm" className="flex items-center">
                                    <Edit className="mr-1 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <p className="mb-6 text-gray-700">{edition.description}</p>

                    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Users className="mb-2 h-6 w-6 text-[#03329b]" />
                            <span className="text-2xl font-semibold">{edition.registrations.length} </span>
                            <span className="text-xs text-gray-500">Registrations</span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Users className="mb-2 h-6 w-6 text-[#fd5f90]" />
                            <span className="text-2xl font-semibold">{edition.speakers.length} </span>
                            <span className="text-xs text-gray-500">Speakers</span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Building className="mb-2 h-6 w-6 text-[#03329b]" />
                            <span className="text-2xl font-semibold">{edition.sponsors.length} </span>
                            <span className="text-xs text-gray-500">Sponsors</span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Image className="mb-2 h-6 w-6 text-[#fd5f90]" />
                            <span className="text-2xl font-semibold">{edition.galleries.length}</span>
                            <span className="text-xs text-gray-500">Gallery Items</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold">Venue Information</h3>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-500" />
                                    <div>
                                        <p className="font-medium">{edition.venue}</p>
                                        <p className="text-sm text-gray-600">
                                            {edition.city}, {edition.country}
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
                    <div className="flex flex-col gap-3">
                        <Link href={`/admin/editions/${edition.id}/edit`}>
                            <Button variant="outline" className="w-full">
                                Edit Edition
                            </Button>
                        </Link>
                        <Link href="/admin/speakers/create">
                            <Button variant="outline" className="w-full">
                                Add Speaker
                            </Button>
                        </Link>
                        <Link href="/admin/sponsors/create">
                            <Button variant="outline" className="w-full">
                                Add Sponsor
                            </Button>
                        </Link>
                        <Link href="/admin/gallery/create">
                            <Button variant="outline" className="w-full">
                                Add Gallery Image
                            </Button>
                        </Link>
                        <Link href="/admin/timeline/create">
                            <Button variant="outline" className="w-full">
                                Add Timeline Event
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>

            <EditionTabs edition={edition} />
        </AppLayout>
    );
}
