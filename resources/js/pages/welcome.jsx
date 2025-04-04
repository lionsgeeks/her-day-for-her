import UserLayout from "@/layouts/user-layout";
import HeroSection from "@/components/hero/hero-section"
import AboutSection from "@/components/about/about-section";
import SpeakerSection from "@/components/speakers/speakerSection"
import TimelineSection from "@/components/timeline/timelineSection"
import { usePage } from "@inertiajs/react";

export default function Welcome() {
    const { speakers, timelineEvents } = usePage().props
    return (
        <UserLayout>
            <HeroSection />
            <AboutSection />
            <SpeakerSection speakers={speakers} />
            <TimelineSection timelineEvents={timelineEvents} />
        </UserLayout>
    );
}
