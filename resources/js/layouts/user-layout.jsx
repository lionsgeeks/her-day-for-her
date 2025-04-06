import Navbar from '@/layouts/app/user-navbar-layout';
import { Footer } from "@/components/footer";
import { useAppearance } from '@/hooks/use-appearance';
import { useEffect } from 'react';



export default function UserLayout({ children }) {
    const { appearance, updateAppearance } = useAppearance();
    useEffect(() => {

        updateAppearance('light')
    }, [])

    return (

        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
