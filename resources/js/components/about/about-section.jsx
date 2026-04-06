'use client';

import { Badge } from '@/components/ui/badge';
import { usePage } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    let { about } = usePage().props;

    if (!about || !about.content) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    };

    return (
        <section ref={ref} className="container bg-white p-12 lg:p-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="grid items-center gap-12 md:grid-cols-2"
            >
                <motion.div variants={itemVariants}>
                    <img src={about.content.image} alt="About Her Day for Her" className="h-1/5 w-full rounded-lg shadow-lg" />
                </motion.div>
                <div>
                    <motion.div variants={itemVariants}>
                        <Badge className="text-beta">About the MasterClass</Badge>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-beta mt-4 text-3xl font-bold md:text-4xl">
                        {about.content.title}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground mt-6 text-lg">
                        {about.content.mainText}
                    </motion.p>
                    <motion.p variants={itemVariants} className="text-muted-foreground mt-4 text-lg">
                        {about.content.secondaryText}
                    </motion.p>
                    <motion.div variants={containerVariants} className="mt-8 grid grid-cols-3 gap-6">
                        <motion.div variants={statsVariants} className="space-y-2">
                            <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.attendees}</div>
                            <p className="text-muted-foreground text-sm">Attendees </p>
                        </motion.div>
                        <motion.div variants={statsVariants} className="space-y-2">
                            <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.speakers}</div>
                            <p className="text-muted-foreground text-sm">Speakers </p>
                        </motion.div>
                        <motion.div variants={statsVariants} className="space-y-2">
                            <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.sessions}</div>
                            <p className="text-muted-foreground text-sm">Editions </p>
                        </motion.div>
                        {/* <motion.div variants={statsVariants} className="space-y-2">
              <div className="text-3xl font-bold text-[#fd5f90]">{about.content.stats.days}</div>
              <p className="text-sm text-muted-foreground">Days of inspiration and connection</p>
            </motion.div> */}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
