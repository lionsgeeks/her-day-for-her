import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import SpeakerCard from "./speakerCard"

export default function SpeakersSection({ speakers }) {
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

    const speakerVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    }

    return (
        <section ref={ref} className="py-16 px-6 bg-[#fbf3fb]">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <motion.div variants={itemVariants}>
                        <Badge className="mb-4 text-white rounded-full bg-alpha">Featured Speakers</Badge>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-black">
                        Meet Our Speakers
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl">
                        Learn from industry leaders, innovators, and changemakers who are shaping the future.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                >

                    {/* when speakers are added to database use this */}
                    {
                        speakers.map((speaker, index) => (
                            <motion.div key={index} variants={speakerVariants}>
                                <SpeakerCard
                                    name={speaker.name}
                                    role={speaker.position}
                                    image={'/storage/' + speaker.image}
                                    topic={speaker.linkedin}
                                    index={index}
                                />
                            </motion.div>
                        ))
                    }
                </motion.div>

            </div>
        </section>
    )
}

