'use client';
import AdminHeader from '@/components/admin-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Building, Calendar, Clock, Edit, Image, MapPin, Users } from 'lucide-react';
import EditionTabs from '../../../../components/edition-tabsDetails';

export default function EditionDetailsPage() {
    const { edition } = usePage().props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    const breadcrumbs = [
        {
            title: 'Editions',
            href: '/admin/editions',
        },
        {
            title: edition.name,
            href: `/admin/editions/${edition.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader title="Edition Details" description={`Viewing details for ${edition.name}`} />

            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm lg:col-span-2">
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#0505511f] via-[#ff006326] to-[#05055114]" />

                    <CardContent className="relative p-5 sm:p-6">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{edition.name}</h2>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[var(--color-beta)]" />
                                        <span>{formatDate(edition.date)}</span>
                                    </div>
                                    {edition.event_time && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-[var(--color-beta)]" />
                                            <span>{edition.event_time}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
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
                        </div>

                        <div className="rounded-xl border border-slate-200 mt-8 bg-slate-50 p-4">
                            <p className="text-sm leading-relaxed text-slate-700">{edition.description}</p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                                <Users className="mx-auto mb-1 h-5 w-5 text-[var(--color-alpha)]" />
                                <p className="text-xl font-semibold text-slate-900">{edition.registrations?.length ?? 0}</p>
                                <p className="text-xs text-slate-500">Registrations</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                                <Users className="mx-auto mb-1 h-5 w-5 text-[var(--color-beta)]" />
                                <p className="text-xl font-semibold text-slate-900">{edition.speakers?.length ?? 0}</p>
                                <p className="text-xs text-slate-500">Speakers</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                                <Building className="mx-auto mb-1 h-5 w-5 text-[var(--color-alpha)]" />
                                <p className="text-xl font-semibold text-slate-900">{edition.sponsors?.length ?? 0}</p>
                                <p className="text-xs text-slate-500">Sponsors</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                                <Image className="mx-auto mb-1 h-5 w-5 text-[var(--color-beta)]" />
                                <p className="text-xl font-semibold text-slate-900">{edition.galleries?.length ?? 0}</p>
                                <p className="text-xs text-slate-500">Gallery Sets</p>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Venue Information</h3>
                                <div className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-beta)]" />
                                    <div>
                                        <p className="font-medium text-slate-900">{edition.venue}</p>
                                        <p className="text-sm text-slate-600">
                                            {edition.city}, {edition.country}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Contact</h3>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <p>
                                        <span className="font-medium text-slate-800">Email:</span> {edition.email}
                                    </p>
                                    <p>
                                        <span className="font-medium text-slate-800">Phone:</span> {edition.phone}
                                    </p>
                                    <p>
                                        <span className="font-medium text-slate-800">Attendees:</span> {edition.attendees}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="mb-1 text-lg font-semibold text-slate-900">Quick Actions</h3>
                        <p className="text-sm text-slate-500">Jump to related resources for this edition.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href={`/admin/editions/${edition.id}/edit`}>
                            <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Edit className="h-4 w-4 text-[var(--color-beta)]" />
                                    Edit Edition
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>

                        <Link href="/admin/speakers">
                            <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Users className="h-4 w-4 text-[var(--color-alpha)]" />
                                    Add Speaker
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>

                        <Link href="/admin/sponsors">
                            <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Building className="h-4 w-4 text-[var(--color-alpha)]" />
                                    Add Sponsor
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>

                        <Link href="/admin/gallery">
                            <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Image className="h-4 w-4 text-[var(--color-beta)]" />
                                    Add Gallery Image
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>

                        <Link href="/admin/timeline">
                            <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors hover:bg-slate-100">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Clock className="h-4 w-4 text-[var(--color-beta)]" />
                                    Add Timeline Event
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Link>
                    </div>
                </Card>
            </div>

            <EditionTabs edition={edition} />
        </AppLayout>
    );
}
