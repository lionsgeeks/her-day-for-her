import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { Building, ImageIcon, User2, Users } from 'lucide-react';
const EditionTabs = ({ edition }) => {
    return (
        <Tabs defaultValue="sponsors" className="mb-6">
            <TabsList>
                <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="registrations">Registrations</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="sponsors" className="mt-6">
                {edition.sponsors.length < 1 ? (
                    <Card className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Building className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold">No sponsors yet</h3>
                            <p className="mx-auto max-w-md text-gray-500">
                                This edition doesn't have any sponsors yet. Add sponsors to showcase them on your conference website.
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {edition.sponsors.map((sponsor) => (
                            <Card key={sponsor.id} className="overflow-hidden">
                                <div className="flex flex-col items-center p-4">
                                    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-lg">
                                        <img src={`/storage/${sponsor.images[0].path}`} alt={sponsor.name} fill className="object-contain" />
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
                    </div>
                )}
            </TabsContent>

            <TabsContent value="speakers" className="mt-6">
                {edition.speakers.length < 1 ? (
                    <Card className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Users className="mb-2 h-6 w-6 text-[#fd5f90]" />
                            </div>
                            <h3 className="text-xl font-semibold">No speakers yet</h3>
                            <p className="mx-auto max-w-md text-gray-500">
                                This edition doesn't have any speakers yet. Add speakers to showcase them on your conference website.
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        {edition.speakers.map((speaker) => (
                            <Card key={speaker.id} className="overflow-hidden">
                                <div className="flex flex-col items-center p-4">
                                    <div className="relative mb-2 aspect-square w-[70%] overflow-hidden rounded-full">
                                        <img
                                            src={`/storage/${speaker.image}`}
                                            alt={speaker.name}
                                            fill
                                            className="aspect-square w-full object-cover"
                                        />
                                    </div>
                                    <h3 className="mb-1 text-center text-lg font-bold">{speaker.name}</h3>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="registrations" className="mt-6">
                {edition.registrations.length < 1 ? (
                    <Card className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <User2 className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold">No registrations yet</h3>
                            <p className="mx-auto max-w-md text-gray-500">This edition doesn't have any registrations yet.</p>
                        </div>
                    </Card>
                ) : (
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
                                            Phone
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {edition.registrations.map((registration) => (
                                        <tr key={registration.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                                {registration.first_name} {registration.last_name}{' '}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{registration.email}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{registration.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Showing {edition.registrations.length} of {edition.name} registrations
                            </p>
                        </div>
                    </Card>
                )}
            </TabsContent>

            <TabsContent value="gallery" className="mt-6">
                {edition.galleries.length < 1 ? (
                    <Card className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold">No Images yet</h3>
                            <p className="mx-auto max-w-md text-gray-500">
                                This edition doesn't have any images yet. Add images to showcase them on your conference website.
                            </p>
                        </div>
                    </Card>
                ) : (
                    <div>
                        {edition.galleries.map((item) => (
                            <div key={item.id} className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {item.images.map((element) => (
                                    <Card key={element.id} className="group relative aspect-square w-full overflow-hidden">
                                        <div className="relative aspect-square">
                                            <img src={`/storage/${element.path}`} alt="" className="object-cover" />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
};

export default EditionTabs;
