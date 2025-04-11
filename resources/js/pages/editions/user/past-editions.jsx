import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import UserLayout from "@/layouts/user-layout";
import { Head, usePage, Link } from "@inertiajs/react";

;

export default function EditionsPage() {

    const { editions } = usePage().props
    const [selectedYear, setSelectedYear] = useState(editions[0].year);
    const selectedEdition = editions.find((e) => e.year == selectedYear);

    // console.log(selectedEdition?.speakers);


    return (
        <UserLayout>
            <Head title="Her Day For Her" />

            <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-[#f8e9f8]">
                <main className="flex-1">
                    <section className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-alpha to-beta opacity-90"></div>
                        <div className="container relative z-10 py-16 md:py-24 text-center text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Past Editions</h1>
                            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                                Explore the history of Her Day for Her Conference and relive the moments that have shaped our community.
                            </p>
                        </div>
                    </section>

                    <section className="p-12 lg:px-24 container">
                        {/* Select Dropdown */}
                        <div className="flex justify-end mb-8">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border rounded p-2 text-sm"
                            >
                                {editions.map((edition) => (
                                    <option key={edition.year} value={edition.year}>
                                        {edition.year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Edition Details */}
                        <div className="space-y-12">
                            <div className="text-center mb-8">
                                <Badge className="mb-2">{selectedEdition?.venue}</Badge>
                                <h2 className="text-3xl font-bold mb-2">Her Day for Her {selectedEdition.year}</h2>
                                {/* <p className="text-muted-foreground max-w-2xl mx-auto">{selectedEdition.description}</p> */}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <img
                                    src={'/storage/' + selectedEdition?.galleries[0]?.images[0]?.path}
                                    alt={`${selectedEdition.year} Conference`}
                                    className="rounded-lg shadow-md w-full"
                                />
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-[#fd5f90]" />
                                            <span>{new Date(selectedEdition.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-[#fd5f90]" />
                                            <span>{selectedEdition.venue}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-[#fd5f90]" />
                                            <span>{selectedEdition.attendees}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold">Theme: "{selectedEdition.name}"</h3>
                                    <p>{selectedEdition.description}</p>

                                    <div className="flex gap-4 pt-2">
                                        <Link href="/gallery">

                                            <Button className="bg-[#03329b] hover:bg-[#03329b]/90">View Gallery</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Speakers */}
                            {
                                selectedEdition?.speakers.length > 0 && (

                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-center">Featured Speakers</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {selectedEdition?.speakers?.map((speaker, idx) => (
                                                <div key={idx} className="text-center flex  flex-col items-center">
                                                    <a href={speaker.linkedin} className=" relative mb-3  overflow-hidden">
                                                        <img src={"storage/" + speaker.image} alt={speaker.name} className="object-cover w-32 h-32 rounded-full" />
                                                    </a>
                                                    <h4 className="font-semibold">{speaker.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{speaker.role}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                            {/* Featured Sponsors */}


                            {
                                selectedEdition?.sponsors.length > 0 && (

                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-center">Featured Sponsors</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 items-center">
                                            {selectedEdition?.sponsors?.map((sponsor, idx) => (
                                                sponsor.images.map((image, idx) =>
                                                    <>
                                                        <img key={idx} src={"storage/" + image.path} className="rounded w-2/3 hover:scale-105 transition-all duration-300 ease-in-out" />
                                                    </>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                            {/* Gallery */}

                            {
                                selectedEdition?.galleries.length > 0 && (


                                    <div className="mt-12 text-center">
                                        <h3 className="text-2xl font-bold mb-6">Gallery Highlights</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            {selectedEdition?.galleries?.slice(0, 4).map((gall, idx) => (
                                                gall?.images?.slice(0, 4).map((image, idx) =>
                                                    <>
                                                        <img key={idx} src={"storage/" + image.path} className="rounded object-contain hover:scale-105 transition-all duration-300 ease-in-out" />
                                                    </>
                                                )
                                            ))}
                                        </div>
                                        <Link href="/gallery">
                                            <Button className="bg-[#fd5f90] hover:bg-[#fd5f90]/90">
                                                View Full {selectedEdition.year} Gallery <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                )
                            }

                        </div>
                    </section>
                </main>
            </div>
        </UserLayout>
    );
}
