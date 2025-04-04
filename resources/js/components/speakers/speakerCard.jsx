import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star, Heart, Sparkles } from "lucide-react"


export default function SpeakerCard({ name, role, image, topic, index }) {
    // Generate a random color scheme for each speaker card
    const colorSchemes = [
        {
            bg: "from-fun-pink to-fun-purple",
            accent: "bg-fun-yellow",
            text: "text-fun-yellow",
            border: "border-fun-yellow",
        },
        { bg: "from-fun-purple to-fun-blue", accent: "bg-fun-pink", text: "text-fun-pink", border: "border-fun-pink" },
        { bg: "from-fun-blue to-fun-green", accent: "bg-fun-purple", text: "text-fun-purple", border: "border-fun-purple" },
        { bg: "from-fun-green to-fun-yellow", accent: "bg-fun-blue", text: "text-fun-blue", border: "border-fun-blue" },
        { bg: "from-fun-yellow to-fun-orange", accent: "bg-fun-green", text: "text-fun-green", border: "border-fun-green" },
        { bg: "from-fun-orange to-fun-red", accent: "bg-fun-yellow", text: "text-fun-yellow", border: "border-fun-yellow" },
    ]

    // get a random color based on index
    const colorScheme = colorSchemes[index % 6]

    // Random icon for each speaker
    const icons = [
        <Star key="star" className="h-4 w-4" />,
        <Heart key="heart" className="h-4 w-4" />,
        <Sparkles key="sparkles" className="h-4 w-4" />,
    ]
    const iconIndex = name.length % icons.length

    return (
        <motion.div
        key={index}
            whileHover={{
                y: -10,
                rotate: Math.random() > 0.5 ? 2 : -2,
                transition: { duration: 0.3 },
            }}
        >
            <Card className="overflow-hidden transition-all p-0 hover:shadow-lg rounded-2xl border-2 border-white">
                <CardContent className="p-0">
                    <div className="relative h-64 w-full">
                        <img src={image} className="h-full w-full object-cover rounded-t-xl" alt={name} />

                        {/* Colorful overlay on hover */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t  transition-opacity flex items-end p-6`}
                        >
                            <div className="text-white opacity-100">
                                <p className="font-bold mb-2 flex items-center">
                                    {icons[iconIndex]} <span className="ml-1">Linkedin:</span>
                                </p>
                                <a href={topic} target="_blank" rel="noopener noreferrer">{topic}</a>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4">
                            <motion.div
                                className={`${colorScheme.accent} rounded-full p-2 shadow-md`}
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                            >
                                {icons[iconIndex]}
                            </motion.div>
                        </div>
                    </div>

                    <div className={`p-4 border-t-4 ${colorScheme.border}`}>
                        <h3 className={`font-bold text-lg ${colorScheme.text}`}>{name}</h3>
                        <p className="text-sm text-muted-foreground">{role}</p>

                        {/* Decorative bar */}
                        <div className={`w-1/3 h-1 mt-2 rounded-full ${colorScheme.accent} opacity-50`}></div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

