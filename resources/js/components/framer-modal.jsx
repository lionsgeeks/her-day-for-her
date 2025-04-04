import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

export default function FramerModal({
    isOpen,
    onClose,
    children,
}) {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

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
                        className="bg-white rounded-lg shadow-xl overflow-hidden"
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
                                {/* If children are passed, render them inside the form */}
                                {children || (
                                    <>
                                        <p>This is an empty Modal Component</p>
                                    </>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
