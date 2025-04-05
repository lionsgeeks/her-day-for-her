"use client"

import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import GalleryModal from "./gallery-modal"
import { Link } from "@inertiajs/react"


export default function GalleryGrid({ limit = 8, showViewAll = true, galleries }) {
    // In a real app, this would come from a database or API
    const galleryImages = [
        { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Conference keynote", caption: "Opening Keynote" },
        { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Panel discussion", caption: "Women in Tech Panel" },
        { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Workshop session", caption: "Leadership Workshop" },
        { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Networking event", caption: "Evening Networking" },
        { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Award ceremony", caption: "Excellence Awards" },
        {
            id: 6,
            src: "/placeholder.svg?height=400&width=600",
            alt: "Conference attendees",
            caption: "Attendee Collaboration",
        },
        {
            id: 7,
            src: "/placeholder.svg?height=400&width=600",
            alt: "Speaker presentation",
            caption: "Tech Innovation Talk",
        },
        { id: 8, src: "/placeholder.svg?height=400&width=600", alt: "Conference venue", caption: "Conference Venue" },
        { id: 9, src: "/placeholder.svg?height=400&width=600", alt: "Breakout session", caption: "Breakout Session" },
        { id: 10, src: "/placeholder.svg?height=400&width=600", alt: "Lunch break", caption: "Networking Lunch" },
        { id: 11, src: "/placeholder.svg?height=400&width=600", alt: "Q&A session", caption: "Interactive Q&A" },
        { id: 12, src: "/placeholder.svg?height=400&width=600", alt: "Closing ceremony", caption: "Closing Ceremony" },
    ]

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const displayImages = galleryImages.slice(0, limit)

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

    return (
        <div className="space-y-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
                {galleries.map((image, index) => (
                        <motion.div
                            key={image.id}
                            variants={itemVariants}
                            className="group relative overflow-hidden rounded-lg cursor-pointer"
                            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                            onClick={() => openModal(index)}
                        >
                            <div className={`aspect-square w-full relative ${index % 2 ? 'h-[400px]' : 'h-[300px]'}`}>
                                <img src={'http://127.0.0.1:8000/storage/' + image.path} alt=""
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110 "
                                />
                            </div>
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
                    <Link href="/gallery">
                        <Button className="bg-gradient-to-r from-beta to-alpha hover:scale-110 transition-all duration-300 ease-in-out">
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

