import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function TimelineSection({ timelineEvents }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })

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


    const colorSchemes = [
        {
            bg: "from-beta to-fun-purple",
            accent: "bg-fun-yellow",
            text: "text-fun-yellow",
            border: "border-fun-yellow",
        },
        { bg: "from-fun-purple to-fun-blue", accent: "bg-beta", text: "text-beta", border: "border-beta" },
        { bg: "from-fun-blue to-fun-green", accent: "bg-fun-purple", text: "text-fun-purple", border: "border-fun-purple" },
        { bg: "from-fun-green to-fun-yellow", accent: "bg-fun-blue", text: "text-fun-blue", border: "border-fun-blue" },
        { bg: "from-fun-yellow to-fun-orange", accent: "bg-fun-green", text: "text-fun-green", border: "border-fun-green" },
        { bg: "from-fun-orange to-fun-red", accent: "bg-fun-yellow", text: "text-fun-yellow", border: "border-fun-yellow" },
    ]

    return (
        <section id="timeline" ref={ref} className="py-16 px-6 container bg-white text-black">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col items-center text-center mb-12"
            >
                <motion.div variants={itemVariants}>
                    <Badge className="mb-4 bg-gradient-to-r from-fun-pink to-fun-blue text-white px-4 py-1 rounded-full text-sm">
                        <Sparkles className="h-4 w-4 mr-1" /> Conference Program
                    </Badge>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
                    Event Timeline
                </motion.h2>
                <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl">
                    Explore our carefully curated program featuring inspiring talks, interactive workshops, and networking
                    opportunities.
                </motion.p>
            </motion.div>


            {/* TimeLine Part */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative max-w-3xl mx-auto"
            >
                {/* Central line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block bg-gradient-to-b from-fun-pink via-fun-purple to-fun-blue -ml-[0.5px] rounded-full"></div>

                {timelineEvents.map((event, index) => (
                    <motion.div key={index} variants={itemVariants} className="relative mb-16 last:mb-0 group">
                        {/* Circle node */}
                        <div className="absolute right-2 md:left-1/2 top-0 -ml-5 mt-3">
                            <div className={`w-10 h-10 rounded-full group-hover:scale-110 group-hover:rotate-360 transition-all duration-300 ease-in-out bg-white border-4 ${colorSchemes[index % 6].border} flex items-center justify-center text-lg `}>
                                {event.icon}
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                            <div className="hidden md:w-5/12"></div>
                            <div className="hidden md:w-2/12"></div>
                            <div className={`w-full md:w-5/12 group-hover:scale-110 transition-scale duration-300 ease-in-out ${index % 2 === 0 ? "text-left md:text-right " : "text-left"}`}>
                                <div className={`bg-white rounded-lg shadow-sm p-6 border-l-6 md:border-t-6 md:border-l-0 ${colorSchemes[index % 6].border}`}>
                                    <div className="text-sm font-semibold text-[#fd5f90] mb-2">{event.startTime} - {event.endTime}</div>
                                    <h3 className="text-xl font-bold text-[#03329b] mb-2">{event.title}</h3>
                                    <p className="text-muted-foreground">{event.description}</p>
                                    <div className={`w-full h-1 mt-4 rounded-full ${colorSchemes[index % 6].accent} opacity-40`}></div>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </section>
    )
}

