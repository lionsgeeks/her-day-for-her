import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button"
import { Camera, ChevronLeft, ChevronRight, Edit, Eye, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { useState } from "react";
import { Badge } from "@/components/ui/badge"

export default function GalleryCard({ gal, onDeletePress }) {
    const baseUrl = window.location.origin;
    const [imageIndex, setImageIndex] = useState(0)
    const handleNext = () => {
        setImageIndex((prev) => (prev === gal.images.length - 1 ? 0 : prev + 1))
    }

    const handlePrev = () => {
        setImageIndex((prev) => (prev === 0 ? gal.images.length - 1 : prev - 1))
    }

    return (
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

                    <img src={baseUrl + '/storage/' + gal.images[imageIndex]?.path} />
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
                                // onClick={() => handlePreview(image)}
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview (TODO)
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                // onClick={() => onEdit(image)}
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit (TODO)
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
    )
}
