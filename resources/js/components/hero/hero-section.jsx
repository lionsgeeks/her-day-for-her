'use client';

import { RegistrationModalTrigger } from '@/components/registrations/registration-modal';
import { Badge } from '@/components/ui/badge';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function HeroSection() {
    const { hero } = usePage().props;

    let heroContent = hero?.content;

    if (!heroContent) return null;

    return (
        <section className="relative flex min-h-screen items-center px-12 text-center lg:px-24 lg:text-start">
            <div className="absolute inset-0 z-0">
                <img src={heroContent.image} className="h-full w-full object-cover" />
                <div className="from-alpha/80 to-beta/70 absolute inset-0 bg-gradient-to-r"></div>
            </div>

            <div className="relative z-10 py-24 md:py-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-3xl space-y-4 text-white md:space-y-6"
                >
                    <Badge className="bg-white text-[#03329b]">{heroContent.date}</Badge>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        {heroContent.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-l opacity-90 md:text-xl lg:block lg:w-3/4"
                    >
                        {heroContent.subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col gap-4 pt-2 sm:flex-row md:pt-4"
                    >
                        <RegistrationModalTrigger />
                        <a
                            href="#timeline"
                            size="lg"
                            variant="outline"
                            className="bg-alpha/80 rounded-lg border-none px-6 py-2 text-white hover:bg-white/10"
                        >
                            Explore Program
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col flex-wrap items-center gap-4 pt-2 sm:flex-row md:gap-6 md:pt-4 lg:items-start"
                    >
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                            <span className="text-sm md:text-base">{heroContent.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                            <span className="text-sm md:text-base">{heroContent.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
                            <span className="text-sm md:text-base">+{heroContent.attendees} Attendees</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="absolute right-0 bottom-10 left-0 flex justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex space-x-2"
                ></motion.div>
            </div>
        </section>
    );
}
