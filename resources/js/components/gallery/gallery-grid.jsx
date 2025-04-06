import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import GalleryModal from "./gallery-modal"
import { Link } from "@inertiajs/react"


export default function GalleryGrid({ limit = 8, showViewAll = true, galleries, gridCols = 3 }) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    }

    const openModal = (index) => {
        setSelectedImageIndex(index)
        setModalOpen(true)
    }
    const baseUrl = window.location.origin;
    return (
        <div className="space-y-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid grid-cols-2 md:grid-cols-${gridCols} gap-4`}
            >
                {galleries.map((image, index) => (
                    <motion.div
                        key={image.id}
                        variants={itemVariants}
                        className="group relative overflow-hidden rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                        onClick={() => openModal(index)}
                    >
                        <img   src={`${baseUrl}/storage/${image.path}`} alt=""
                            className="w-full h-full object-cover aspect-square transition-transform group-hover:scale-110 "
                        />
                    </motion.div>
                ))}
            </motion.div>

            {showViewAll && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex justify-center"
                >
                    <Link href="/gallery" className="mt-4">
                        <Button className="bg-gradient-to-r text-white from-beta to-alpha hover:scale-110 transition-all duration-300 ease-in-out">
                            View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            )}

            <GalleryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                images={galleries}
                currentImageIndex={selectedImageIndex}
            />
        </div>
    )
}

