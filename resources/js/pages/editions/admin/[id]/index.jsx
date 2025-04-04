'use client';
import AdminHeader from '@/components/admin-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Building, Calendar, Clock, Edit, Image, Mail, MapPin, Phone, Plus, Users } from 'lucide-react';
// import Link from "next/link"
// import Image from "next/image"

export default function EditionDetailsPage() {
    const { edition } = usePage().props;
    console.log(edition)
    // Mock data - in a real app, this would come from your API based on the ID
    //   const edition = {
    //     id: 1,
    //     year: "2025",
    //     name: "Her Day for Her 2025",
    //     startDate: "2025-06-15",
    //     endDate: "2025-06-17",
    //     location: "Paris, France",
    //     venue: "Le Grand Palais",
    //     // status: "upcoming",
    //     // registrations: 342,
    //     // speakers: 28,
    //     // sponsors: 15,
    //     // galleryItems: 24,
    //     description:
    //       "The premier conference for women in technology and leadership. Join us for three days of inspiring talks, workshops, and networking opportunities.",
    //     // website: "https://herdayforher.com/2025",
    //     contactEmail: "info@herdayforher.com",
    //     // contactPhone: "+33 1 23 45 67 89",
    //   }

    // Mock data for sponsors
    const sponsors = [
        {
            id: 1,
            name: 'TechCorp Global',
            logo: '/placeholder.svg?height=200&width=200',
            editions: ['2025', '2024', '2023'],
        },
        {
            id: 2,
            name: 'InnovateTech',
            logo: '/placeholder.svg?height=200&width=200',
            editions: ['2025', '2024'],
        },
        {
            id: 3,
            name: 'Future Systems',
            logo: '/placeholder.svg?height=200&width=200',
            editions: ['2025'],
        },
    ];

    // Mock data for speakers
    const speakers = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            role: 'CTO, TechCorp Global',
            image: '/placeholder.svg?height=200&width=200',
            topic: 'The Future of AI in Business',
        },
        {
            id: 2,
            name: 'Emma Williams',
            role: 'Founder & CEO, InnovateTech',
            image: '/placeholder.svg?height=200&width=200',
            topic: 'Breaking Barriers in Tech Leadership',
        },
        {
            id: 3,
            name: 'Maria Garcia',
            role: 'VP of Engineering, Future Systems',
            image: '/placeholder.svg?height=200&width=200',
            topic: 'Building Inclusive Engineering Teams',
        },
    ];

    // Mock data for registrations
    const registrations = [
        {
            id: 1,
            name: 'Jane Smith',
            email: 'jane@example.com',
            ticketType: 'VIP',
            purchaseDate: '2025-01-15',
        },
        {
            id: 2,
            name: 'Lisa Brown',
            email: 'lisa@example.com',
            ticketType: 'Professional',
            purchaseDate: '2025-01-20',
        },
        {
            id: 3,
            name: 'Emily Chen',
            email: 'emily@example.com',
            ticketType: 'Student',
            purchaseDate: '2025-01-25',
        },
    ];

    // Mock data for gallery
    const gallery = [
        { id: 1, image: '/placeholder.svg?height=600&width=800', edition: '2025' },
        { id: 2, image: '/placeholder.svg?height=600&width=800', edition: '2025' },
        { id: 3, image: '/placeholder.svg?height=600&width=800', edition: '2025' },
        { id: 4, image: '/placeholder.svg?height=600&width=800', edition: '2025' },
    ];

    const getStatusBadge = (status) => {
        const colors = {
            upcoming: 'bg-blue-100 text-blue-800',
            active: 'bg-green-100 text-green-800',
            past: 'bg-gray-100 text-gray-800',
        };

        return <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    };

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
                            {/* {getStatusBadge(edition.status)} */}
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
                            <span className="text-2xl font-semibold">{edition.registrations} TODO</span>
                            <span className="text-xs text-gray-500">Registrations</span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Users className="mb-2 h-6 w-6 text-[#fd5f90]" />
                            <span className="text-2xl font-semibold">{edition.speakers} TODO</span>
                            <span className="text-xs text-gray-500">Speakers</span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Building className="mb-2 h-6 w-6 text-[#03329b]" />
                            <span className="text-2xl font-semibold">{edition.sponsors} TODO</span>
                            <span className="text-xs text-gray-500">Sponsors</span>
                        </div>
                        <div className="flex flex-col items-center rounded-md bg-gray-50 p-4">
                            <Image className="mb-2 h-6 w-6 text-[#fd5f90]" />
                            <span className="text-2xl font-semibold">{edition.galleryItems}TODO</span>
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
                                            {edition.city} {edition.country}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-gray-500" />
                                    <p className="text-sm text-gray-600">Doors open at 8:00 AM </p>
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

            <Tabs defaultValue="sponsors" className="mb-6">
                <TabsList>
                    <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
                    <TabsTrigger value="speakers">Speakers</TabsTrigger>
                    <TabsTrigger value="registrations">Registrations</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="sponsors" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {sponsors.map((sponsor) => (
                            <Card key={sponsor.id} className="overflow-hidden">
                                <div className="flex flex-col items-center p-4">
                                    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-lg">
                                        <Image src={sponsor.logo || '/placeholder.svg'} alt={sponsor.name} fill className="object-contain" />
                                    </div>
                                    <h3 className="mb-2 text-center text-lg font-bold">{sponsor.name}</h3>
                                    <Link href={`/admin/sponsors/${sponsor.id}`}>
                                        <Button variant="outline" size="sm" className="mt-2">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                        {/* <Link href="/admin/sponsors/create">
                            <Card className="flex h-full items-center justify-center border-dashed p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#03329b]/10">
                                        <Plus className="h-6 w-6 text-[#03329b]" />
                                    </div>
                                    <p className="font-medium text-[#03329b]">Add Sponsor</p>
                                </div>
                            </Card>
                        </Link> */}
                    </div>
                </TabsContent>

                <TabsContent value="speakers" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {speakers.map((speaker) => (
                            <Card key={speaker.id} className="overflow-hidden">
                                <div className="flex flex-col items-center p-4">
                                    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                                        <Image src={speaker.image || '/placeholder.svg'} alt={speaker.name} fill className="object-cover" />
                                    </div>
                                    <h3 className="mb-1 text-center text-lg font-bold">{speaker.name}</h3>
                                    <p className="mb-2 text-center text-sm text-gray-600">{speaker.role}</p>
                                    <p className="mb-3 text-center text-sm">{speaker.topic}</p>
                                    <Link href={`/admin/speakers/${speaker.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                        {/* <Link href="/admin/speakers/create">
                            <Card className="flex h-full items-center justify-center border-dashed p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#03329b]/10">
                                        <Plus className="h-6 w-6 text-[#03329b]" />
                                    </div>
                                    <p className="font-medium text-[#03329b]">Add Speaker</p>
                                </div>
                            </Card>
                        </Link> */}
                    </div>
                </TabsContent>

                <TabsContent value="registrations" className="mt-6">
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Name
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Email
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Ticket Type
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Purchase Date
                                        </th>
                                        <th className="bg-gray-50 px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {registrations.map((registration) => (
                                        <tr key={registration.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{registration.name}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{registration.email}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                <Badge
                                                    className={
                                                        registration.ticketType === 'VIP'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : registration.ticketType === 'Professional'
                                                              ? 'bg-blue-100 text-blue-800'
                                                              : 'bg-green-100 text-green-800'
                                                    }
                                                >
                                                    {registration.ticketType}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {formatDate(registration.purchaseDate)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <Link href={`/admin/registrations/${registration.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Showing {registrations.length} of {edition.registrations} registrations
                            </p>
                            {/* <Link href="/admin/registrations">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link> */}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="gallery" className="mt-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {gallery.map((item) => (
                            <Card key={item.id} className="group relative overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image src={item.image || '/placeholder.svg'} alt="" fill className="object-cover" />
                                </div>
                            </Card>
                        ))}
                        <Link href="/admin/gallery/create">
                            <Card className="flex aspect-square items-center justify-center border-dashed">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#03329b]/10">
                                        <Plus className="h-6 w-6 text-[#03329b]" />
                                    </div>
                                    <p className="font-medium text-[#03329b]">Add Image</p>
                                </div>
                            </Card>
                        </Link>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Link href="/admin/gallery">
                            <Button variant="outline">View All Gallery Images</Button>
                        </Link>
                    </div>
                </TabsContent>
            </Tabs>
        </AppLayout>
    );
}
