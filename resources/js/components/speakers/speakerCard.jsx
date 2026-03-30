import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"


function isLinkedInUrl(url) {
    if (!url || typeof url !== 'string') return false
    return url.trim().toLowerCase().includes('linkedin')
}

export default function SpeakerCard({ name, role, image, linkedin, index }) {
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

    const colorScheme = colorSchemes[index % 6]

    const cardInner = (
        <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-red-600 p-0 transition-all hover:shadow-lg rounded-2xl border-2 border-white">
            <CardContent className="flex min-h-0 flex-1 flex-col p-0">
                {/* Fixed aspect ratio so every photo crops the same way — no vertical “stair” misalignment */}
                <div className="relative w-full shrink-0 overflow-hidden rounded-t-xl aspect-[3/4]">
                    <img
                        src={image}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        alt={name}
                        loading="lazy"
                    />
                </div>

                <div className={`flex min-h-[7.5rem] flex-1 flex-col justify-start gap-1 border-t-4 p-4 ${colorScheme.border} bg-white`}>
                    {/* <div className={`w-1/3 h-1 mt-2 rounded-full ${colorScheme.accent} opacity-50`}></div> */}
                    <h3 className={`font-bold text-lg ${colorScheme.text}`}>{name}</h3>
                    <p className="text-sm text-muted-foreground">{role}</p>

                    {/* Decorative bar */}
                </div>
            </CardContent>
        </Card>
    )

    const hoverMotion = {
        y: -10,
        rotate: index % 2 === 0 ? 2 : -2,
        transition: { duration: 0.3 },
    }

    if (isLinkedInUrl(linkedin)) {
        return (
            <motion.a
                href={linkedin.trim()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={hoverMotion}
                className="flex h-full min-h-0 cursor-pointer flex-col"
            >
                {cardInner}
            </motion.a>
        )
    }

    return (
        <motion.div whileHover={hoverMotion} className="flex h-full min-h-0 flex-col">
            {cardInner}
        </motion.div>
    )
}

