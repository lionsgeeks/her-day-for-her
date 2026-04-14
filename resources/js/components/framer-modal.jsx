import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function FramerModal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:items-center sm:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="my-2 max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl sm:my-0 sm:max-h-[calc(100dvh-3rem)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <button
                                className="absolute top-4 right-4 z-10 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div>
                                {children ?? (
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
