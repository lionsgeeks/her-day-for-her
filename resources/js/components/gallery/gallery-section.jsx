import { Badge } from "@/components/ui/badge"
import GalleryGrid from "./gallery-grid"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Camera, Sparkles, Heart } from "lucide-react"

export default function GallerySection({galleries}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

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

    // Decorative elements animation
    const decorVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, delay: 0.5 },
        },
    }

    return (
        <section ref={ref} className="lg:p-24 container bg-white p-12">
            {/* Colorful background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-fun-purple/5 to-fun-pink/10 -z-10"></div>

            {/* Decorative elements */}
            <motion.div
                variants={decorVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute top-10 right-10 w-40 h-40 rounded-full bg-fun-yellow/10 -z-10"
            ></motion.div>

            <motion.div
                variants={decorVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-fun-pink/10 -z-10"
            ></motion.div>

            <motion.div
                variants={decorVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-fun-green/10 -z-10"
            ></motion.div>

            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <motion.div variants={itemVariants}>
                        <Badge className="mb-4 bg-gradient-to-r from-beta to-alpha text-white px-4 py-1 rounded-full">
                            <Camera className="h-4 w-4 mr-1" /> Photo Gallery
                        </Badge>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Moments from Previous Editions
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl">
                        Explore highlights from our past conferences and get a glimpse of the inspiring atmosphere, connections
                        made, and knowledge shared.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex gap-2 mt-4">
                        {/* little title stuff */}
                        {["Workshops", "Speakers", "Networking", "Fun"].map((tag, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 3 : -3 }}
                                className={`px-3 py-1 rounded-full text-xs font-medium
                                    ${i === 0
                                        ? "bg-fun-pink/20 text-fun-pink"
                                        : i === 1
                                            ? "bg-fun-purple/20 text-fun-purple"
                                            : i === 2
                                                ? "bg-fun-yellow/20 text-fun-yellow"
                                                : "bg-fun-green/20 text-fun-green"
                                    }`}
                            >
                                {i % 2 === 0 ? <Heart className="h-3 w-3 inline mr-1" /> : <Sparkles className="h-3 w-3 inline mr-1" />}
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative"
                >
                    {/* Decorative elements around gallery */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-fun-pink/20 -z-10"></div>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-fun-yellow/20 -z-10"></div>

                    {/* Image Grid/masonry */}
                    <GalleryGrid limit={8} showViewAll={true} galleries={galleries} />
                </motion.div>
            </div>
        </section>
    )
}

