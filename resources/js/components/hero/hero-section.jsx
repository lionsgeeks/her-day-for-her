"use client"

import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RegistrationModal } from "@/components/registrations/registration-modal"
import { motion } from "framer-motion"
import { usePage } from "@inertiajs/react"

export default function HeroSection() {

  const { hero } = usePage().props

  let heroContent = hero.content



  return (
    <section className="relative lg:px-24 px-12 text-center lg:text-start min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img src={heroContent.image} alt="Conference" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-tl from-alpha/90 to-[#fd5f90]/70"></div>
      </div>

      <div className=" relative z-10 py-24 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-white space-y-4 md:space-y-6  w-full"
        >
          <Badge className="bg-white text-[#03329b]">{heroContent.date}</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            {heroContent.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-l md:text-xl lg:w-3/4 opacity-90 lg:block "
          >
            {heroContent.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4"
          >
            <RegistrationModal />
            <a href="#timeline" size="lg" variant="outline" className="border-none text-white bg-alpha px-6 py-2 rounded-lg hover:bg-white/10">
              Explore Program
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center lg:items-start sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4 flex-wrap"
          >
            <div className="flex items-center  gap-2">
              <Calendar className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base">{heroContent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base">{heroContent.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base">+{heroContent.attendees} Attendees</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex space-x-2"
        >

        </motion.div>
      </div>
    </section>
  )
}

