import UserLayout from "@/layouts/user-layout";
import HeroSection from "@/components/hero/hero-section"
import AboutSection from "@/components/about/about-section";

export default function Welcome() {

    return (
        <UserLayout>
            <HeroSection />
            <AboutSection />
        </UserLayout>
    );
}
