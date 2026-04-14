import AdminHeader from '@/components/admin-header';
import InputError from '@/components/input-error';
import { SuccessModal } from '@/components/success-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import AssignSponsors from '../../../../components/assign-sponsors';

export default function EditEditionPage() {
    const { edition, sponsors } = usePage().props;
    const [selectedSponsors, setSelectedSponsors] = useState(edition.sponsors || []);
    const { data, setData, put, processing, errors } = useForm({
        name: edition.name,
        year: edition.year,
        description: edition.description,
        date: new Date(edition.date).toISOString().split('T')[0],
        event_time: edition.event_time ?? '',
        google_map_url: edition.google_map_url,
        email: edition.email,
        attendees: edition.attendees,
        phone: edition.phone,
        city: edition.city,
        country: edition.country,
        venue: edition.venue,
        isActive: edition.is_active,
        selectedSponsors: selectedSponsors.map((s) => s.id),
    });

    const updateSelectedSponsors = (sponsors) => {
        setSelectedSponsors(sponsors);
        setData((prev) => ({ ...prev, selectedSponsors: sponsors.map((s) => s.id) }));
    };
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked) => {
        setData((prev) => ({ ...prev, isActive: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('editions.update', edition.id), {
            onSuccess: () => setShowSuccessModal(true),
        });
    };
    const breadcrumbs = [
        {
            title: 'Editions',
            href: '/admin/editions',
        },
        {
            title: `Edit ${edition.name}`,
            href: `/admin/editions/${edition.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader title="Edit Edition" description="Update this conference edition" />

            <Card className="overflow-hidden border-0 bg-transparent p-0 shadow-none">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <CardContent className="space-y-6 border-0 bg-transparent p-0 shadow-none">
                        <div className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">General Information</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Edition Name</Label>
                                    <Input id="name" name="name" value={data.name} onChange={handleChange} placeholder="e.g. Her Day for Her 2025" required />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input id="year" name="year" type="number" value={data.year} onChange={handleChange} required />
                                    <InputError message={errors.year} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        placeholder="Describe the conference edition..."
                                        rows={5}
                                        required
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">Date & Location</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" name="date" type="date" value={data.date} onChange={handleChange} required />
                                    <InputError message={errors.date} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event_time">Heure de l&apos;événement (optionnel)</Label>
                                    <Input
                                        id="event_time"
                                        name="event_time"
                                        type="text"
                                        value={data.event_time}
                                        onChange={handleChange}
                                        placeholder="ex. 14h00"
                                    />
                                    <InputError message={errors.event_time} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={data.city} onChange={handleChange} placeholder="e.g. Paris" required />
                                    <InputError message={errors.city} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" value={data.country} onChange={handleChange} placeholder="e.g. France" required />
                                    <InputError message={errors.country} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="venue">Venue</Label>
                                    <Input
                                        id="venue"
                                        name="venue"
                                        value={data.venue}
                                        onChange={handleChange}
                                        placeholder="e.g. Grand Conference Center"
                                        required
                                    />
                                    <InputError message={errors.venue} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="google_map_url">Google map Url</Label>
                                    <Input
                                        type="text"
                                        id="google_map_url"
                                        name="google_map_url"
                                        value={data.google_map_url}
                                        onChange={handleChange}
                                        placeholder="google map url"
                                    />
                                    <InputError message={errors.google_map_url} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700 uppercase">Contact & Capacity</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Contact email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Contact email"
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        type="phone"
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        placeholder="Contact phone number"
                                        required
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="attendees">Attendees</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        id="attendees"
                                        name="attendees"
                                        value={data.attendees}
                                        onChange={handleChange}
                                        placeholder="e.g. 180 attendees"
                                        required
                                    />
                                    <InputError message={errors.attendees} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Edition Settings</h3>
                            <div className="flex items-center space-x-2 rounded-lg border border-slate-200 p-3">
                                <Checkbox id="isActive" checked={data.isActive} onCheckedChange={handleCheckboxChange} />
                                <label
                                    htmlFor="isActive"
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Set as active edition
                                </label>
                            </div>
                            <InputError className="mt-2" message={errors.isActive} />
                        </div>

                        <div className="rounded-2xl border bg-white p-4 shadow-sm">
                            <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Assign Sponsors</h3>
                            <AssignSponsors sponsors={sponsors} selectedSponsors={selectedSponsors} setSelectedSponsors={updateSelectedSponsors} />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col-reverse gap-3 px-0 py-4 sm:flex-row sm:justify-end">
                        <Link href="/admin/editions" className="w-full sm:w-auto">
                            <Button type="button" variant="outline" className="w-full sm:w-auto">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[var(--color-alpha)] text-white hover:bg-[#040442] sm:w-auto"
                        >
                            {processing ? 'Saving...' : 'Update Edition'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Edition Updated!"
                message="The conference edition has been successfully updated."
            />
        </AppLayout>
    );
}
