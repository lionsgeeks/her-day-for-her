import { useState, useEffect } from "react"
// import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function GalleryModal({ isOpen, onClose, images, currentImageIndex }) {
    const [imageIndex, setImageIndex] = useState(currentImageIndex)

    useEffect(() => {
        setImageIndex(currentImageIndex)
    }, [currentImageIndex])

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose()
        }

        const handleKeyNav = (e) => {
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "ArrowLeft") handlePrev()
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEsc)
            document.addEventListener("keydown", handleKeyNav)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.removeEventListener("keydown", handleKeyNav)
            document.body.style.overflow = "auto"
        }
    }, [isOpen, imageIndex])

    const handleNext = () => {
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handlePrev = () => {
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative w-full h-full flex flex-col items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors"
                            onClick={onClose}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="relative w-full h-[80vh] max-w-6xl flex items-center justify-center">
                            <img src={'/storage/' + images[imageIndex].path}
                                alt="image title or somthing"
                                className="object-contain w-5/6"
                            />
                        </div>

                        <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                            <p className="text-sm opacity-70">
                                {imageIndex + 1} / {images.length}
                            </p>
                        </div>

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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

