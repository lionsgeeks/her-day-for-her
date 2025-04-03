"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    <section ref={ref} className="lg:p-24 container p-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={itemVariants}>
          <img
            src="https://store.iipbooks.com/wp-content/uploads/2023/11/1223-front-cover-page-scaled.jpg"
            alt="About Her Day for Her"
  
            className="rounded-lg shadow-lg h-1/5 w-full"
          />
        </motion.div>
        <div>
          <motion.div variants={itemVariants}>
            <Badge>About the Conference</Badge>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mt-4">
            Celebrating Women's Achievements in Technology
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-6">
            Her Day for Her is more than just a conference; it's a movement dedicated to recognizing and amplifying
            women's voices in technology and leadership roles. Since our founding in 2022, we've created a platform
            where women can share experiences, build connections, and inspire the next generation of leaders.
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mt-4">
            Our 2025 conference brings together industry pioneers, emerging talents, and allies for three days of
            inspiring talks, practical workshops, and meaningful networking opportunities. We're committed to creating
            an inclusive environment where ideas flourish and collaborations begin.
          </motion.p>
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-6 mt-8">
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">500+</div>
              <p className="text-sm text-muted-foreground">Attendees from around the world</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">50+</div>
              <p className="text-sm text-muted-foreground">Expert speakers and workshop leaders</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">30+</div>
              <p className="text-sm text-muted-foreground">Sessions across multiple tracks</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">3</div>
              <p className="text-sm text-muted-foreground">Days of inspiration and connection</p>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button className="bg-[#03329b] hover:bg-[#03329b]/90 mt-8">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

