"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// import { LanguageSwitcher } from "@/components/language-switcher"
import { RegistrationModal } from "@/components/registrations/registration-modal"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "@inertiajs/react"
import AppLogoIcon from "@/components/app-logo-icon"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [scrolled])

    return (
        <header
            className={`fixed lg:px-24 top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${scrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="container flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <Link href="/" className="flex items-center gap-2">
                        <AppLogoIcon className="w-5" />
                        <span className={`text-xl font-bold lg:block hidden ${scrolled ? "text-[#03329b]" : "text-white"}`}>Her Day for Her</span>
                    </Link>
                </motion.div>

                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`hidden md:flex items-center gap-8 ${scrolled ? "text-gray-800" : "text-white"}`}
                >
                    <Link href="/" className={`text-sm font-medium hover:opacity-80 ${scrolled ? "text-[#03329b]" : ""}`}>
                        Home
                    </Link>
                    <Link href="/gallery" className="text-sm font-medium hover:opacity-80">
                        Gallery
                    </Link>
                    <Link href="/editions" className="text-sm font-medium hover:opacity-80">
                        Past Editions
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:opacity-80">
                        Contact
                    </Link>
                </motion.nav>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4"
                >
                    {/* <div className="hidden md:block">
                        <LanguageSwitcher isScrolled={scrolled} />
                    </div> */}
                    <Link href="/admin">
                        <button
                            variant="outline"
                            size="sm"
                            className={`hidden md:flex items-center ${scrolled ? "border-gray-300" : "border-white text-white hover:bg-white/10"}`}
                        >
                            <span>Admin</span>
                        </button>
                    </Link>
                    <RegistrationModal />
                    <Button
                        variant="outline"
                        size="icon"
                        className={`md:hidden bg-transparent ${scrolled ? "border-gray-300" : "border-white text-white"}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </motion.div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white mx-5 shadow-lg py-4 px-6 absolute top-full left-0 right-0"
                >
                    <nav className="flex flex-col space-y-4">
                        <Link href="/" className="text-sm font-medium text-gray-800 hover:text-[#03329b]">
                            Home
                        </Link>
                        <Link href="/gallery" className="text-sm font-medium text-gray-800 hover:text-[#03329b]">
                            Gallery
                        </Link>
                        <Link href="/editions" className="text-sm font-medium text-gray-800 hover:text-[#03329b]">
                            Past Editions
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-gray-800 hover:text-[#03329b]">
                            Contact
                        </Link>
                        {/* <Link href="/admin" className="text-sm font-medium text-gray-800 hover:text-[#03329b]">
                            Admin Dashboard
                        </Link> */}
                        {/* <div className="pt-2">
                            <LanguageSwitcher isScrolled={true} />
                        </div> */}
                    </nav>
                </motion.div>
            )}
        </header>
    )
}

