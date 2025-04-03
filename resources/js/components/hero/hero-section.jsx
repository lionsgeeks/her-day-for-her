"use client"

import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RegistrationModal } from "@/components/registration-modal"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative lg:px-24 px-12 text-center lg:text-start min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img src="https://cdn.discordapp.com/attachments/1234855161869111406/1357301919378313407/image.png?ex=67efb56b&is=67ee63eb&hm=4edf76c0c0ea87526e5447f0e4c4c2dcb6c8c28a3b4d0bf24d3ed1406d60532f&"  alt="Conference" fill className="object-cover w-full h-full" priority />
        <div className="absolute inset-0 bg-gradient-to-tl from-alpha/90 to-[#fd5f90]/70"></div>
      </div>

      <div className=" relative z-10 py-24 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-white space-y-4 md:space-y-6  w-full"
        >
          <Badge className="bg-white text-[#03329b]">June 15-17, 2025</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Empowering Women in Technology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-l md:text-xl lg:w-3/4 opacity-90 lg:block "
          >
            Join us for the annual Her Day for Her Conference celebrating women in technology, leadership, and
            innovation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4"
          >
            <RegistrationModal />
            <Button size="lg" variant="outline" className="border-none text-white bg-alpha hover:bg-white/10">
              Explore Program
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center lg:items-start sm:flex-row gap-4 md:gap-6 pt-2 md:pt-4 flex-wrap"
          >
            <div className="flex items-center  gap-2">
              <Calendar className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base">June 15-17, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base">Grand Conference Center, Paris</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="text-sm md:text-base">500+ Attendees</span>
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

