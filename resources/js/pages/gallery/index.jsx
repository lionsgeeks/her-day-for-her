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
import GalleryCard from '../../components/gallery/gallery-card';



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

    const baseUrl = window.location.origin;
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
                        <GalleryCard gal={gal} onDeletePress={onDeletePress} />
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

                <form onSubmit={handleForm} className="w-full lg:w-[35vw] space-y-3 p-3">

                    <div>
                        <h1 className='text-2xl text-center'>Create A New Gallery</h1>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <label htmlFor="edition" className='text-lg'>Select an Edition: </label>
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


                    <div className="">
                        <label htmlFor="images" className="text-lg">
                            Choose Images:
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="images"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
                                </div>
                                <input id="images" name="images" type="file" accept="image/*" multiple className="hidden"
                                    onChange={e => setData('images', Array.from(e.target.files))}
                                />
                            </label>
                        </div>
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
