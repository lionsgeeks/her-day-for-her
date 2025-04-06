import Navbar from '@/layouts/app/user-navbar-layout';
import { Footer } from "@/components/footer";



export default function UserLayout({ children }) {

    return (

        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
