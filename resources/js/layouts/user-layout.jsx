import Navbar from '@/layouts/app/user-navbar-layout';



export default function UserLayout({ children }) {

    return (

        <div>
            <Navbar />
            {children}
        </div>
    );
}
