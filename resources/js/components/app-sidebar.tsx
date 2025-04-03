import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ChevronDown, Folder, LayoutGrid, Calendar, MessageSquare, Users, Settings, Image, Megaphone, ClipboardList } from 'lucide-react';
import AppLogo from './app-logo';
import { useState } from 'react';
import Dashboard from '@/pages/dashboard';

const DashboardItem: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];
const mainNavItems: NavItem[] = [
    { title: 'Editions', url: '/editions', icon: Calendar },
    { title: 'Speakers', url: '/speakers', icon: Megaphone },
    { title: 'Sponsors', url: '/sponsors', icon: ClipboardList },
    { title: 'Gallery', url: '/gallery', icon: Image },
    { title: 'Timeline', url: '/timeline', icon: Calendar },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
    { title: 'Registration', url: '/registration', icon: Users },

];

const contentItems: NavItem[] = [
    { title: 'Hero ', url: '/hero', icon: Calendar },
    { title: 'About', url: '/about', icon: Megaphone },

];

export function AppSidebar() {
    const [isContentOpen, setIsContentOpen] = useState(false);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroupLabel className='text-white' color='white'>Platform</SidebarGroupLabel>

                <NavMain items={DashboardItem} />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setIsContentOpen(!isContentOpen)}
                            className="flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2 px-1.5 text-white">
                                <ClipboardList color='#ff48e5' className="w-4" />
                                Content
                            </span>
                            <ChevronDown color='#ff48e5' className={`w-4 h-4 transition-transform ${isContentOpen ? 'rotate-180' : ''}`} />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {isContentOpen && (
                        <div className="ml-6">
                            {contentItems.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2 text-white">
                                            {/* <item.icon className="w-5 h-5" /> */}
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </div>
                    )}
                </SidebarMenu>

                <NavMain items={mainNavItems} />

            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
