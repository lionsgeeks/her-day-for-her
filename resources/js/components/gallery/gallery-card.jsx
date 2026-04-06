import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useForm } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Eye, Images, MoreHorizontal, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../framer-modal';

export default function GalleryCard({ gal, onDeletePress }) {
    const { delete: destroy } = useForm();

    const [imageIndex, setImageIndex] = useState(0);
    const handleNext = () => {
        setImageIndex((prev) => (prev === gal.images.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setImageIndex((prev) => (prev === 0 ? gal.images.length - 1 : prev - 1));
    };

    const [modal, setModal] = useState(false);

    const deleteImage = (id) => {
        destroy(route('gallery.image', { image: id }));
    };

    return (
        <>
            <Card className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-[#0505511f] via-[#ff006326] to-[#05055114]" />
                <CardContent className="relative p-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video">
                        <img
                            src={'/storage/' + gal.images[imageIndex]?.path}
                            alt={`Gallery preview ${imageIndex + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:gap-2 sm:px-3 sm:text-xs">
                            <Images className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            {imageIndex + 1} / {gal.images.length}
                        </div>

                        <button
                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-white/35 sm:left-3 sm:p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                        >
                            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                        </button>

                        <button
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-white/35 sm:right-3 sm:p-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                        >
                            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                        </button>

                        <div className="absolute right-2 top-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full bg-white/85 text-slate-700 shadow hover:bg-white hover:text-slate-900 sm:h-8 sm:w-8"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setModal(true)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View All
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                        onClick={() => onDeletePress(gal)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4 text-current" />
                                        Delete Gallery (All Images)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="space-y-3 p-3 sm:p-4">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <Badge className="max-w-full rounded-full border-[#0505513b] bg-[#05055114] px-2.5 py-1 text-[11px] text-[var(--color-alpha)] sm:px-3 sm:text-xs">
                                Edition: {gal.edition?.name ? `${gal.edition.name} - ` : ''}
                                {gal.edition?.year}
                            </Badge>
                            <Badge className="rounded-full border-[#ff00633b] bg-[#ff006314] px-2.5 py-1 text-[11px] text-[var(--color-beta)] sm:px-3 sm:text-xs">
                                Images: {gal.images.length}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <FramerModal
                isOpen={modal}
                onClose={() => {
                    setModal(false);
                }}
            >
                <Card className="flex max-h-[calc(100dvh-1.5rem)] gap-0 w-[92vw] max-w-5xl flex-col overflow-hidden border-0 p-0 shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
                    <CardHeader className="relative border-b px-5 py-4 sm:px-6">
                        {/* <div className="absolute inset-x-0 top-0 h-16 " /> */}
                        <div className="relative flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Gallery Images</h2>
                                <p className="text-sm text-slate-600">Browse all images and remove specific ones if needed.</p>
                            </div>
                            <Badge className="rounded-full border-[#ff00633b] bg-[#ff006314] px-3 py-1 text-xs text-[var(--color-beta)]">
                                {gal.images.length} image(s)
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="min-h-0 flex-1 overflow-y-auto bg-slate-50/60 p-4 sm:p-6">
                        {gal.images.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                                This gallery has no images.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                {gal.images.map((img, ind) => (
                                    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white" key={ind}>
                                        <span className="absolute left-2 top-2 z-10 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                            #{ind + 1}
                                        </span>
                                        <button
                                            className="absolute top-2 right-2 z-10 rounded-full bg-red-500 p-1 text-white shadow transition-all duration-300 hover:scale-105 hover:bg-red-400"
                                            onClick={() => {
                                                deleteImage(img.id);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                        <img
                                            src={'/storage/' + img.path}
                                            alt={`Gallery image ${ind + 1}`}
                                            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col-reverse gap-2 border-t bg-white px-5 py-4 sm:flex-row sm:justify-between sm:px-6">
                        <Button
                            variant="outline"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
                            onClick={() => {
                                setModal(false);
                                onDeletePress(gal);
                            }}
                        >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete Entire Gallery
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            Close
                        </Button>
                    </CardFooter>
                </Card>
            </FramerModal>
        </>
    );
}
