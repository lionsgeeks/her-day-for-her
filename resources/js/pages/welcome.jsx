import UserLayout from "@/layouts/user-layout";
import HeroSection from "@/components/hero/hero-section"
import AboutSection from "@/components/about/about-section";
import SpeakerSection from "@/components/speakers/speakerSection"
import TimelineSection from "@/components/timeline/timelineSection"
import GallerySection from "@/components/gallery/gallery-section"
import { Head, usePage } from "@inertiajs/react";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { MapSection } from "@/components/map-section";

export default function Welcome() {
    const { speakers, timelineEvents, galleries } = usePage().props
    return (
        <UserLayout>
            <Head title="Her Day For Her" />
            <HeroSection />
            <AboutSection />
            <SpeakerSection speakers={speakers} />
            <TimelineSection timelineEvents={timelineEvents} />
            <GallerySection galleries={galleries} />

            <CtaSection />
            <MapSection />
            <Footer />
        </UserLayout>
    );
}
