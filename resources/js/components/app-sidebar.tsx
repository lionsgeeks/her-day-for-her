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

const MaindItem: NavItem[] = [
    { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutGrid, },
    { title: 'Editions', url: '/admin/editions', icon: Calendar },
    { title: 'Messages', url: '/admin/contact', icon: MessageSquare },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
    { title: 'Registration', url: '/admin/registrations', icon: Users },
];
const EventElement: NavItem[] = [
    { title: 'Speakers', url: '/admin/speakers', icon: Megaphone },
    { title: 'Sponsors', url: '/admin/sponsors', icon: ClipboardList },
    { title: 'Gallery', url: '/admin/gallery', icon: Image },
    { title: 'Timeline', url: '/admin/timeline', icon: Calendar },

];

const contentItems: NavItem[] = [
    { title: 'Hero ', url: '/admin/content/hero-panel', icon: Calendar },
    { title: 'About', url: '/admin/content/about-panel', icon: Megaphone },

];

export function AppSidebar() {
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

                <SidebarGroupLabel className='px-5' color='white'>Main</SidebarGroupLabel>
                <NavMain items={MaindItem} />

                <SidebarGroupLabel className='px-5' color='white'>Content</SidebarGroupLabel>
                <NavMain items={contentItems} />

                <SidebarGroupLabel className='px-5' color='white'>Event Elements</SidebarGroupLabel>
                <NavMain items={EventElement} />

            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
