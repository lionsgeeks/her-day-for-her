import AdminHeader from '@/components/admin-header';
import { SuccessModal } from '@/components/success-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
// import Link from "next/link"
import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import AssignSponsors from '../../../components/assign-sponsors';

export default function CreateEditionPage() {
    const { data, setData, progress, post } = useForm({
        name: '',
        year: new Date().getFullYear() + 1,
        // theme: '',
        description: '',
        date: '',
        // endDate: '',
        google_map_url: '',
        email: '',
        attendees: '',
        phone: '',
        city: '',
        country: '',
        venue: '',
        isActive: true,
        selectedSponsors: [],
    });
    const { sponsors } = usePage().props;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedSponsors, setSelectedSponsors] = useState([]);
    const updateSelectedSponsors = (sponsors) => {
        setSelectedSponsors(sponsors);
        setData((prev) => ({ ...prev, selectedSponsors: sponsors.map(s => s.id) }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked) => {
        setData((prev) => ({ ...prev, isActive: checked }));
    };
    const breadcrumbs = [{
        title: 'Create Editions',
        href: '/admin/create'
    }]
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('editions.store'), {
            onSuccess: () => setShowSuccessModal(true),
            onFinish: () => {
                setData({
                    name: '',
                    year: new Date().getFullYear() + 1,
                    // theme: '',
                    description: '',
                    date: '',
                    // endDate: '',
                    google_map_url: '',
                    attendees: '',
                    city: '',
                    country: '',
                    venue: '',
                    isActive: true,
                    selectedSponsors: [],
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader title="Create Edition" description="Set up a new conference edition" />

            <Link href="/admin/editions" className="mb-6 inline-flex items-center text-sm text-[#03329b] hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Editions
            </Link>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Edition Name</Label>
                            <Input id="name" name="name" value={data.name} onChange={handleChange} placeholder="e.g. Her Day for Her 2025" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Input id="year" name="year" type="number" value={data.year} onChange={handleChange} required />
                        </div>

                        {/* <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Input
                                id="theme"
                                name="theme"
                                value={data.theme}
                                onChange={handleChange}
                                placeholder="e.g. Breaking Boundaries"
                                required
                            />
                        </div> */}

                        <div className="space-y-2">
                            <Label htmlFor="google_map_url">Google map Url</Label>
                            <Input
                                type="text"
                                id="google_map_url"
                                name="google_map_url"
                                value={data.google_map_url}
                                onChange={handleChange}
                                placeholder="google map url"
                                required
                            />
                        </div>

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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={data.city} onChange={handleChange} placeholder="e.g. Paris" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" name="country" value={data.country} onChange={handleChange} placeholder="e.g. France" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="venue">Venue</Label>
                            <Input
                                id="venue"
                                name="venue"
                                value={data.venue}
                                onChange={handleChange}
                                placeholder="e.g. Grand Conference Center"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="venue">Attendees</Label>
                            <Input
                                type="number"
                                min={0}
                                id="attendees"
                                name="attendees"
                                value={data.attendees}
                                onChange={handleChange}
                                placeholder="e.g. 180 attendees"

                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" type="date" value={data.startDate} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
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
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="isActive" checked={data.isActive} onCheckedChange={handleCheckboxChange} />
                        <label
                            htmlFor="isActive"
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Set as active edition
                        </label>
                    </div>
                    <AssignSponsors sponsors={sponsors} selectedSponsors={selectedSponsors} setSelectedSponsors={updateSelectedSponsors} />

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-[#03329b] hover:bg-[#03329b]/90">
                            Create Edition
                        </Button>
                    </div>
                </form>
            </Card>

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Edition Created!"
                message="The new conference edition has been successfully created."
            />
        </AppLayout>
    );
}
