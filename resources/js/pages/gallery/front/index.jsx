import UserLayout from "@/layouts/user-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion"
import GalleryGrid from "@/components/gallery/gallery-grid"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";


export default function FrontGallery() {
    const { images, editions, galleries } = usePage().props;
    const [selectedEdition, setSelectedEdition] = useState();
    const [filteredImages, setFilteredImages] = useState(images);

    useEffect(() => {
        if (selectedEdition) {
            const galleryID = galleries.find((gal) => gal.edition_id == selectedEdition).id;
            const filImg = images.filter((img) => img.imageable_id == galleryID);
            setFilteredImages(filImg);

        } else {
            setFilteredImages(images)
        }
    }, [selectedEdition])

    return (
        <UserLayout>
            <Head title="Gallery" />
            <section className="pt-32 pb-16 p-6 bg-gradient-to-r from-alpha to-beta">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Conference Gallery</h1>
                        <p className="text-xl opacity-90">Explore moments from our conferences and relive the inspiration and connections.</p>
                    </motion.div>
                </div>

            </section>

            <section className="p-6 bg-white">
                <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <p className="w-[150px] text-black">Filter By Year:</p>
                        <Select value={selectedEdition} onValueChange={setSelectedEdition}>
                            <SelectTrigger>
                                <option value="" disabled>{selectedEdition ? editions.find(item => item.id == selectedEdition).year + " Edition" : 'Please Select An Edition'}</option>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={null}>
                                    All Editions
                                </SelectItem>
                                {editions.filter((ed) => ed.galleries.length > 0).map((edition) => (
                                    <SelectItem key={edition.id} value={edition.id}>
                                        {edition.year} Edition
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <br />
                <GalleryGrid showViewAll={false} galleries={filteredImages} gridCols={4} />
            </section>



            <section className="py-12 bg-slate-50">
                <div className="container text-center">
                    <Badge className="mb-4 bg-gradient-to-r from-alpha to-beta text-white py-1">Share Your Experience</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">Have Photos from the Conference?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        We'd love to see your perspective! Share your photos with us using the hashtag #HerDayForHer or submit them
                        directly through our form.
                    </p>
                    <Link href="/contact">
                        <Button className="bg-beta hover:bg-beta/90 text-white">Submit Your Photos</Button>
                    </Link>
                </div>
            </section>


        </UserLayout>
    )
}
