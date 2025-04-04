"use client"

import { useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  type?: "warning" | "danger" | "info"
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
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

  const getColors = () => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-100",
          icon: "text-red-600",
          button: "bg-red-600 hover:bg-red-700",
        }
      case "info":
        return {
          bg: "bg-blue-100",
          icon: "text-blue-600",
          button: "bg-blue-600 hover:bg-blue-700",
        }
      case "warning":
      default:
        return {
          bg: "bg-amber-100",
          icon: "text-amber-600",
          button: "bg-amber-600 hover:bg-amber-700",
        }
    }
  }

  const colors = getColors()

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
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
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
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-4`}>
                  <AlertTriangle className={`h-10 w-10 ${colors.icon}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{message}</p>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={onClose}>
                    {cancelText}
                  </Button>
                  <Button
                    className={colors.button}
                    onClick={() => {
                      onConfirm()
                      onClose()
                    }}
                  >
                    {confirmText}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

