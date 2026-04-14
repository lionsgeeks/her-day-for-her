import AdminHeader from '@/components/admin-header';
import ConfirmationModal from '@/components/confirmationModal';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import FramerModal from '../../components/framer-modal';
import GalleryCard from '../../components/gallery/gallery-card';

export default function GalleryPage() {
    const breadcrumbs = [{ title: 'Gallery', href: '/admin/gallery' }];

    const { galleries, editions } = usePage().props;
    const {
        data,
        setData,
        post,
        errors,
        processing,
        clearErrors,
        delete: destroy,
    } = useForm({
        edition: '',
        images: [],
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState(null);

    const handleCreate = () => {
        clearErrors();
        setData({
            edition: '',
            images: [],
        });
        setFormModal(true);
    };

    const handleForm = (e) => {
        e.preventDefault();
        post(route('gallery.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setData({ edition: '', images: [] });
                setFormModal(false);
            },
        });
    };

    const onDeletePress = (gallery) => {
        setDeleteModalOpen(true);
        setSelectedGallery(gallery);
    };
    const confirmDelete = () => {
        destroy(route('gallery.destroy', { gallery: selectedGallery.id }));
        setDeleteModalOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminHeader
                title="Gallery"
                description="Manage your Gallery Images"
                action={{
                    label: 'Add Gallery',
                    onClick: () => {
                        handleCreate();
                    },
                    icon: <Plus className="h-4 w-4" />,
                }}
            />
            <Head title="Gallery" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {galleries.map((gal) => (
                    <GalleryCard key={gal.id} gal={gal} onDeletePress={onDeletePress} />
                ))}
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
            <FramerModal isOpen={formModal} onClose={() => setFormModal(false)}>
                <Card className="flex max-h-[calc(100dvh-1.5rem)] flex-col gap-0 overflow-hidden border-0 p-0 shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
                    <CardHeader className="relative overflow-hidden border-b px-6 py-5">
                        <div>
                            <h2 className="mt-1 text-xl font-semibold text-slate-900">Create New Gallery</h2>
                            <p className="mt-1 text-sm text-slate-600">Select an edition and upload one or more gallery images.</p>
                        </div>
                    </CardHeader>

                    <form onSubmit={handleForm} className="flex min-h-0 flex-1 flex-col">
                        <CardContent className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-slate-50/60 px-6 py-6">
                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Edition</h3>
                                <div className="space-y-2">
                                    <label htmlFor="edition" className="text-sm font-medium text-slate-700">
                                        Select Edition
                                    </label>
                                    <Select value={data.edition} onValueChange={(value) => setData('edition', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Please Select An Edition" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {editions.map((edition) => (
                                                <SelectItem key={edition.id} value={edition.id}>
                                                    {edition.year} Edition
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.edition} />
                                </div>
                            </div>

                            <div className="rounded-2xl border bg-white p-4 shadow-sm">
                                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase">Gallery Images</h3>
                                <div className="space-y-2">
                                    <label htmlFor="images" className="text-sm font-medium text-slate-700">
                                        Upload Images
                                    </label>
                                    <div className="flex w-full items-center justify-center">
                                        <label
                                            htmlFor="images"
                                            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <p className="mb-2 text-sm text-slate-600">
                                                    <span className="font-semibold text-[var(--color-beta)]">Click to upload</span>
                                                </p>
                                                <p className="text-xs text-slate-500">PNG, JPG, JPEG</p>
                                            </div>
                                            <input
                                                id="images"
                                                name="images"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={(e) => setData('images', Array.from(e.target.files))}
                                            />
                                        </label>
                                    </div>
                                    {data.images?.length > 0 && <p className="text-xs text-slate-500">{data.images.length} image(s) selected</p>}
                                    <InputError message={errors.images} />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col-reverse gap-3 border-t bg-white px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    clearErrors();
                                    setFormModal(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[var(--color-alpha)] text-white hover:bg-[#040442] sm:w-auto"
                            >
                                {processing ? 'Saving...' : 'Create Gallery'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </FramerModal>
        </AppLayout>
    );
}
