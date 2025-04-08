"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { motion } from "framer-motion"
import { SuccessModal } from "@/components/success-modal"
import { useForm, Head, usePage } from "@inertiajs/react";
import UserLayout from '@/layouts/user-layout';


export default function ContactPage() {
    const { edition } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        message: "",
        subject: "",
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(name, value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post((route('contact.store')), {
            onSuccess: () => {
                setShowSuccessModal(true)
            },
        })
    }

    return (

        <UserLayout>
            <Head title="Contact" />

            <section className="pt-32 pb-16 p-6 bg-gradient-to-r from-alpha to-beta text-center">
                <div className="w-full ">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className=" w-full  text-white text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl opacity-90">Have questions? We're here to help.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative">
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#fd5f90]/10 rounded-full"></div>
                        <div className="absolute top-1/4 -right-10 w-32 h-32 bg-alpha/10 rounded-full hidden md:block"></div>
                        <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-[#fd5f90]/20 rounded-full"></div>

                        {/* Main content */}
                        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl overflow-hidden relative z-10">
                            <div className="grid md:grid-cols-2">
                                {/* Contact info side */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-gradient-to-br from-alpha to-beta p-8 text-white"
                                >
                                    <div className="h-full flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white/10 p-3 rounded-full">
                                                        <MapPin className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">Our Location</h3>
                                                        <p className="opacity-90">
                                                            {edition?.city}
                                                            <br />
                                                            {edition?.venue}
                                                            <br />
                                                            {edition?.country}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white/10 p-3 rounded-full">
                                                        <Phone className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">Phone</h3>
                                                        <p className="opacity-90">{edition.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-white/10 p-3 rounded-full">
                                                        <Mail className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">Email</h3>
                                                        <p className="opacity-90">{edition.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="mt-12">
                                            <p className="text-sm opacity-80">Follow us on social media for updates and announcements</p>
                                            <div className="flex gap-4 mt-4">
                                                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </a>
                                                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                                    </svg>
                                                </a>
                                                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div> */}
                                    </div>
                                </motion.div>

                                {/* Form side */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="p-8"
                                >
                                    <h2 className="text-2xl font-bold mb-6 text-alpha">Send Us a Message</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Input
                                                name="name"
                                                value={data.name}
                                                onChange={handleChange}
                                                placeholder="Your Name"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <Input
                                                name="subject"
                                                value={data.subject}
                                                onChange={handleChange}
                                                placeholder="Your subject"
                                            />
                                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                                        </div>

                                        <div>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                onChange={handleChange}
                                                placeholder="Your Email"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <textarea
                                                name="message"
                                                value={data.message}
                                                onChange={handleChange}
                                                placeholder="Your Message"
                                                className="w-full p-2 border rounded-md"
                                                rows={4}
                                            />
                                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                        </div>

                                        <Button type="submit" disabled={processing} className="w-full">
                                            {processing ? "Sending..." : "Send Message"}
                                        </Button>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Message Sent!"
                message="Thank you for contacting us. We'll get back to you as soon as possible."
            />
        </UserLayout>


    )
}
