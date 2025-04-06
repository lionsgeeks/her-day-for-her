"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { usePage } from "@inertiajs/react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  let { about } = usePage().props

  

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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  return (
    <section ref={ref} className="lg:p-24 container bg-white p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={itemVariants}>
          <img
            src={about.content.image}
            alt="About Her Day for Her"

            className="rounded-lg shadow-lg h-1/5 w-full"
          />
        </motion.div>
        <div>
          <motion.div variants={itemVariants}>
            <Badge className="text-beta">About the Conference</Badge>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl text-beta md:text-4xl font-bold mt-4">
            {about.content.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-6">
            {about.content.mainText}
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-4">
            {about.content.secondaryText}
          </motion.p>
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-6 mt-8">
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.attendees}</div>
              <p className="text-sm text-muted-foreground">Attendees from around the world</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.speakers}</div>
              <p className="text-sm text-muted-foreground">Expert speakers and workshop leaders</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.sessions}</div>
              <p className="text-sm text-muted-foreground">Sessions across multiple tracks</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.days}</div>
              <p className="text-sm text-muted-foreground">Days of inspiration and connection</p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

