import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function TimelineSection({timeEv}) {
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

    const timelineEvents = [
        {
            day: "14h00",
            title: "OPENING CEREMONY",
            description: "Join us for the official opening with keynote speeches from industry leaders.",
            icon: "📣",
        },
        {
            day: "14h30",
            title: "PANEL DISCUSSIONS",
            description: "Engaging discussions on women's leadership in technology and innovation.",
            icon: "👥",
        },
        {
            day: "15h00",
            title: "WORKSHOPS",
            description: "Interactive sessions to develop practical skills and knowledge.",
            icon: "🛠️",
        },
        {
            day: "16h00",
            title: "NETWORKING LUNCH",
            description: "Connect with peers and speakers in a relaxed environment.",
            icon: "🍽️",
        },
        {
            day: "17h00",
            title: "TECH SHOWCASE",
            description: "Demonstrations of cutting-edge technologies and innovations.",
            icon: "💻",
        },
        {
            day: "17h30",
            title: "CLOSING CEREMONY",
            description: "Celebrate the success of the conference and future opportunities.",
            icon: "🎉",
        },
    ]

    return (
        <section ref={ref} className="py-16 px-6 container">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col items-center text-center mb-12"
            >
                <motion.div variants={itemVariants}>
                    <Badge className="mb-4">Conference Program</Badge>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
                    Event Timeline
                </motion.h2>
                <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl">
                    Explore our carefully curated program featuring inspiring talks, interactive workshops, and networking
                    opportunities.
                </motion.p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative max-w-3xl mx-auto"
            >
                {/* Central line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -ml-[1px]"></div>

                {timelineEvents.map((event, index) => (
                    <motion.div key={index} variants={itemVariants} className="relative mb-16 last:mb-0">
                        {/* Circle node */}
                        <div className="absolute left-1/2 top-0 -ml-5 mt-3">
                            <div className="w-10 h-10 rounded-full bg-white border-4 border-[#03329b] flex items-center justify-center text-lg">
                                {event.icon}
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                            <div className="w-5/12"></div>
                            <div className="w-2/12"></div>
                            <div className={`w-5/12 ${index % 2 === 0 ? "text-left pl-8" : "text-right pr-8"}`}>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
                                    <div className="text-sm font-semibold text-[#fd5f90] mb-2">{event.day}</div>
                                    <h3 className="text-xl font-bold text-[#03329b] mb-2">{event.title}</h3>
                                    <p className="text-muted-foreground">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* <motion.div
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex justify-center mt-10"
            >
                <Button className="bg-[#03329b] hover:bg-[#03329b]/90">
                    View Full Program <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </motion.div> */}
        </section>
    )
}

