// import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart } from "lucide-react"

export default function SponsorsSection({sponsors}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const sponsorVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  // Array of fun background colors for sponsor cards
  const bgColors = [
    "bg-fun-pink/10",
    "bg-fun-purple/10",
    "bg-fun-yellow/10",
    "bg-fun-green/10",
    "bg-fun-blue/10",
    "bg-fun-orange/10",
  ]

  // Array of border colors to match backgrounds
  const borderColors = [
    "border-fun-pink",
    "border-fun-purple",
    "border-fun-yellow",
    "border-fun-green",
    "border-fun-blue",
    "border-fun-orange",
  ]

  return (
    <section ref={ref} className="py-16 container relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-fun-yellow/10 -z-10"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-fun-pink/10 -z-10"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center text-center mb-12 relative z-10"
      >
        <motion.div variants={itemVariants}>
          <Badge className="mb-4 bg-gradient-to-r from-fun-pink to-fun-purple text-white px-4 py-1 rounded-full">
            <Heart className="mr-1 text-white" /> Our Sponsors
          </Badge>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-alpha to-beta"
        >
          Proudly Supported By
        </motion.h2>

        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl">
          We're grateful to these amazing organizations who believe in empowering women in technology and make this
          conference possible.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
      >
        {sponsors?.map((i) => {
          const colorIndex = i % bgColors.length
          return (
            <motion.div
              key={i}
              variants={sponsorVariants}
              className="flex flex-col items-center"
              whileHover={{
                scale: 1.1,
                rotate: Math.random() > 0.5 ? 3 : -3,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className={`p-1 rounded-full bg-beta/10 border-2 border-alpha mb-3 shadow-lg relative`}
              >
                <div className="w-24 h-24 relative rounded-full overflow-hidden">
                  <img
                    src={`/storage/${i.images[0].path}`}
                    alt={i.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <motion.div
                  className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {i % 3 === 0 ? (
                    <Heart className="h-4 w-4 text-fun-pink" />
                  ) : i % 3 === 1 ? (
                    <Star className="h-4 w-4 text-fun-yellow" />
                  ) : (
                    <Sparkles className="h-4 w-4 text-fun-purple" />
                  )}
                </motion.div> */}
              </div>

              <p className={`text-sm font-medium text-center `}>
                {i.name}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

