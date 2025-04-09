import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button"
import { Camera, ChevronLeft, ChevronRight, Edit, Eye, MoreHorizontal, Plus, Trash2, X } from 'lucide-react';
import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import FramerModal from "../framer-modal";
import { useForm } from "@inertiajs/react";

export default function GalleryCard({ gal, onDeletePress }) {

    const { delete: destroy } = useForm();

    const [imageIndex, setImageIndex] = useState(0)
    const handleNext = () => {
        setImageIndex((prev) => (prev === gal.images.length - 1 ? 0 : prev + 1))
    }

    const handlePrev = () => {
        setImageIndex((prev) => (prev === 0 ? gal.images.length - 1 : prev - 1))
    }

    const [modal, setModal] = useState(false);

    const deleteImage = (id) => {
        destroy(route('gallery.image', {image: id}))
    }

    return (
        <>
            <Card key={gal.id} className="overflow-hidden p-0">
                <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden">

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
                            onClick={(e) => {
                                e.stopPropagation()
                                handlePrev()
                            }}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-colors"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleNext()
                            }}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        <img src={'/storage/' + gal.images[imageIndex]?.path} />
                        <div className="absolute right-2 top-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="" size="icon" className="h-8 w-8 rounded-full bg-white text-black transition-all duration-300 ease-in-out hover:text-white">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() => setModal(true)}
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        View All
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() => onDeletePress(gal)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete ALL GALLERY
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <CardFooter className="py-2 flex items-center gap-2">

                        <Badge className="mb-4 bg-white border-alpha text-alpha px-4 py-1 rounded-full">
                            Edition : {gal.edition.name} - {gal.edition.year}
                        </Badge>
                        <Badge className="mb-4 bg-white border-alpha text-alpha px-4 py-1 rounded-full">
                            Number of Images : {gal.images.length}
                        </Badge>
                    </CardFooter>
                </CardContent>
            </Card>
            <FramerModal
                isOpen={modal}
                onClose={() => { setModal(false) }}
            >
                <div className="p-3 w-[90vw] lg:w-[40vw]">
                    <h1 className="mb-2">Viewing All Images : </h1>
                    <hr />
                    <div className="p-3 grid grid-cols-3 lg:grid-cols-5 gap-2">
                        {
                            gal.images.map((img, ind) => (
                                <div className="relative" key={ind}>
                                    <button className="absolute top-2 right-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"

                                    onClick={() => {deleteImage(img.id)}}
                                    >
                                        <X className="bg-red-500 hover:bg-red-400 text-white p-1 rounded " />
                                    </button>
                                    <img src={'/storage/' + img.path} alt="" className="aspect-square object-cover rounded" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </FramerModal>
        </>
    )
}
