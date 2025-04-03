import { useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@headlessui/react"
import { useForm } from "@inertiajs/react"


export default function SpeakerModal(
    {
        isOpen,
        onClose,
    }
) {

    const { data, setData, post } = useForm({
        name: '',
        position: '',
        linked: '',
        image: '',
    });

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose()
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEsc)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = "auto"
        }
    }, [isOpen, onClose])


    const handleForm = (e) => {
        e.preventDefault();
        post(route('speakers.store'))
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="bg-white rounded-lg shadow-xl   overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative p-6">
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex flex-col items-center text-center">

                                <form onSubmit={handleForm} >
                                    {/* Speaker Image */}
                                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                                        <div className="w-32 h-32 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                                            <img src="https://thispersondoesnotexist.com/" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-2 invisible">Current Profile Photo</h3>
                                            <div className="space-y-2">
                                                <label htmlFor="photo" className=" p-2 rounded-l-lg bg-alpha text-white">Upload New Photo
                                                </label>
                                                <Input id="photo" name="photo" type="file" accept="image/*"
                                                    className="border-2 p-1 rounded-r-lg" onChange={e => setData('image', e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {/* Speaker Name */}
                                        <div className="flex items-start flex-col gap-2">
                                            <label htmlFor="speakerName">Speaker Name:</label>
                                            <Input
                                                type="text"
                                                name="speakerName"
                                                id="speakerName"
                                                className="border-2 rounded w-full p-1"
                                                placeholder="Speaker Name"
                                                value={data.name}
                                                onChange={(e) => { setData('name', e.target.value) }}
                                            />
                                        </div>

                                        {/* Speaker Position */}
                                        <div className="flex items-start flex-col gap-2">
                                            <label htmlFor="speakerPosition">Speaker Position:</label>
                                            <Input
                                                type="text"
                                                name="speakerPosition"
                                                id="speakerPosition"
                                                className="border-2 rounded w-full p-1"
                                                placeholder="Speaker Role"
                                                value={data.position}
                                                onChange={(e) => { setData('position', e.target.value) }}
                                            />
                                        </div>

                                        {/* Speaker LinkedIn */}
                                        <div className="flex items-start flex-col gap-2">
                                            <label htmlFor="speakerLinked">Speaker LinkedIn:</label>
                                            <Input
                                                type="url"
                                                name="speakerLinked"
                                                id="speakerLinked"
                                                className="border-2 rounded w-full p-1"
                                                placeholder="Speaker LinkedIn URL"
                                                value={data.linked}
                                                onChange={(e) => { setData('linked', e.target.value) }}
                                            />
                                        </div>
                                    </div>



                                    <div className="flex justify-end gap-3 mt-6">
                                        <button type="button" variant="outline" onClick={onClose}>
                                            Cancel
                                        </button>
                                        <Button
                                            className="bg-alpha"

                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

