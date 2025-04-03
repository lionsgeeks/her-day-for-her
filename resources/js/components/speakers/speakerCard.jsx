import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function SpeakerCard({ name, role, image, topic, index }) {
    return (
        <motion.div whileHover={{ y: -10, transition: { duration: 0.3 } }}>
            <Card className={`}overflow-hidden group transition-all hover:shadow-md p-0 bg-beta ${index % 2 == 0 ? '-rotate-3': ''}`}>
                <CardContent className="p-0">
                    <div className="relative h-64 w-full">
                        <img src={image} className="h-full w-full object-cover rounded-t-xl" alt={name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03329b]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <div className="text-white">
                                <p className="font-medium">LinkedIn:</p>
                                <a href={topic} target="_blank" rel="noopener noreferrer">
                    {topic}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg">{name}</h3>
                        <p className="text-sm text-white">{role}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

