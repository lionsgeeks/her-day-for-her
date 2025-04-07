"use client"

import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { usePage } from "@inertiajs/react"

export function MapSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    const { edition } = usePage().props



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    const mapVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    }


    const getSanitizedMap = (rawHtml) => {
        if (!rawHtml) return "";

        // Create a temporary DOM element
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = rawHtml;

        const iframe = tempDiv.querySelector("iframe");

        if (iframe) {
            iframe.setAttribute("width", "100%");
            iframe.setAttribute("height", "100%");
            iframe.style.border = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
        }

        return tempDiv.innerHTML;
    };

    return (
        <section ref={ref} className="p-12 lg:px-24  bg-[#fbf3fb]">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <motion.div variants={itemVariants}>
                        <Badge className="mb-4">Location</Badge>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
                        Find Us Here
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl">
                        Join us at the Grand Conference Center in the heart of Paris for three days of inspiration and connection.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="md:col-span-1 space-y-6"
                    >
                        <motion.div variants={itemVariants} className="flex items-start gap-4">
                            <div className="bg-[#03329b]/10 p-3 rounded-full">
                                <MapPin className="h-6 w-6 text-[#03329b]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Our Location</h3>
                                <p className="text-muted-foreground">
                                    {edition.venue} , {edition.city} , {edition.country}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-start gap-4">
                            <div className="bg-[#03329b]/10 p-3 rounded-full">
                                <Phone className="h-6 w-6 text-[#03329b]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-muted-foreground">{edition.phone}</p>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-start gap-4">
                            <div className="bg-[#03329b]/10 p-3 rounded-full">
                                <Mail className="h-6 w-6 text-[#03329b]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Email</h3>
                                <p className="text-muted-foreground">{edition.email}</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={mapVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="md:col-span-2 h-[400px] bg-alpha rounded-lg overflow-hidden shadow-lg"
                        dangerouslySetInnerHTML={{ __html: getSanitizedMap(edition.google_map_url) }}
                    />

                </div>
            </div>
        </section>
    )
}

