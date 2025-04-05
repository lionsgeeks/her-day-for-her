import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from "@inertiajs/react"
import AdminHeader from "@/components/admin-header"
import { Edit, Eye, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../../components/framer-modal';
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import ConfirmationModal from "@/components/confirmationModal"



export default function GalleryPage() {
    const breadcrumbs = [{ title: "Gallery", href: "/admin/gallery" }];

    const { galleries, editions } = usePage().props;
    const { data, setData, post, delete: destroy } = useForm({
        edition: '',
        images: [],
    });


    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState(null);

    const handleCreate = () => {
        setData({
            edition: '',
            images: []
        })
        setFormModal(true);
    }


    const handleForm = (e) => {
        e.preventDefault();
        post(route('gallery.store'))
        setFormModal(false);
    }

    const onDeletePress = (gallery) => {
        setDeleteModalOpen(true);
        setSelectedGallery(gallery)
    }
    const confirmDelete = () => {
        destroy(route('gallery.destroy', { gallery: selectedGallery.id }))
        setDeleteModalOpen(false);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader
                title="Gallery Management"
                description="Manage your Gallery Images"
                action={{
                    label: "Add Gallery",
                    onClick: () => { handleCreate() },
                    icon: <Plus className="h-4 w-4" />,
                }}
            />
            <Head title="Gallery" />

            <div className="grid grid-cols-2 gap-2">

                {
                    galleries.map((gal, index) => (
                        <Card key={gal.id} className="overflow-hidden p-0">
                            <CardContent className="p-0">
                                <div className="relative aspect-video w-full overflow-hidden">

                                    <img src={'http://127.0.0.1:8000/storage/' + gal.images[0]?.path} />
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
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <CardFooter className="py-2">
                                    <p><span className='font-semibold'>Gallry For Edition</span>: {gal.edition.name} - {gal.edition.year}</p>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>


            {/* Deletion Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Gallery"
                message="Are you sure you want to delete all images in this gallery? This action cannot be undone."
                confirmText="Delete"
                type="danger"
            />

            {/* Form Modal */}
            <FramerModal
                isOpen={formModal}
                onClose={() => setFormModal(false)}
            >

                <form onSubmit={handleForm} className="w-full lg:w-[35vw] space-y-3 p-2">
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="edition">Edition</label>
                        <Select value={data.edition} onValueChange={(value) => setData('edition', value)}>
                            <SelectTrigger>
                                <option value="" disabled>{data.edition ? editions.find(item => item.id == data.edition).year : 'Please Select An Edition'}</option>
                            </SelectTrigger>
                            <SelectContent>
                                {editions.map((edition) => (
                                    <SelectItem key={edition.id} value={edition.id}>
                                        {edition.year} Edition
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="images">Choose Images:</label>
                        <input id="images" name="images" type="file" accept="image/*" multiple
                            className="border-2 rounded p-1 w-full" onChange={e => setData('images', Array.from(e.target.files))}
                        />
                    </div>


                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => { setFormModal(false) }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-alpha cursor-pointer"
                        >
                            Confirm
                        </Button>
                    </div>
                </form>

            </FramerModal>
        </AppLayout>
    )
}
