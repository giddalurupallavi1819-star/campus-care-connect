import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard, Users, Bell, BarChart3, MessageCircle, Calendar, Shield,
  Activity, BookOpen, Brain, Settings, LogOut, GraduationCap, Heart
} from 'lucide-react';

const roleMenus: Record<string, { title: string; url: string; icon: any }[]> = {
  student: [
    { title: 'Dashboard', url: '/dashboard/student', icon: LayoutDashboard },
    { title: 'My Wellness', url: '/dashboard/student/wellness', icon: Heart },
    { title: 'Academics', url: '/dashboard/student/academics', icon: BookOpen },
    { title: 'AI Chatbot', url: '/dashboard/student/chatbot', icon: MessageCircle },
    { title: 'Appointments', url: '/dashboard/student/appointments', icon: Calendar },
  ],
  faculty: [
    { title: 'Dashboard', url: '/dashboard/faculty', icon: LayoutDashboard },
    { title: 'Students', url: '/dashboard/faculty/students', icon: Users },
    { title: 'Analytics', url: '/dashboard/faculty/analytics', icon: BarChart3 },
    { title: 'Alerts', url: '/dashboard/faculty/alerts', icon: Bell },
  ],
  counselor: [
    { title: 'Dashboard', url: '/dashboard/counselor', icon: LayoutDashboard },
    { title: 'At-Risk Students', url: '/dashboard/counselor/at-risk', icon: Brain },
    { title: 'Sessions', url: '/dashboard/counselor/sessions', icon: Calendar },
    { title: 'Alerts', url: '/dashboard/counselor/alerts', icon: Bell },
    { title: 'Reports', url: '/dashboard/counselor/reports', icon: Activity },
  ],
  admin: [
    { title: 'Dashboard', url: '/dashboard/admin', icon: LayoutDashboard },
    { title: 'Students', url: '/dashboard/admin/students', icon: GraduationCap },
    { title: 'Analytics', url: '/dashboard/admin/analytics', icon: BarChart3 },
    { title: 'Alerts', url: '/dashboard/admin/alerts', icon: Bell },
    { title: 'Risk Heatmap', url: '/dashboard/admin/heatmap', icon: Brain },
    { title: 'Settings', url: '/dashboard/admin/settings', icon: Settings },
  ],
};

function SidebarLayout({ children }: { children: ReactNode }) {
  const { role, profile, signOut } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = roleMenus[role || 'student'] || roleMenus.student;

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar collapsible="icon">
        <SidebarContent className="flex flex-col h-full">
          <div className="p-4 flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-accent">
              <Shield className="h-4 w-4 text-accent-foreground" />
            </div>
            {!collapsed && <span className="font-display text-sm font-bold text-sidebar-foreground">CampusGuardian</span>}
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end={item.url === `/dashboard/${role}`} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="mt-auto p-4">
            {!collapsed && profile && (
              <div className="mb-3 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">{profile.full_name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-sidebar-foreground truncate">{profile.full_name}</p>
                  <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
                </div>
              </div>
            )}
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground" onClick={() => { signOut(); navigate('/'); }}>
              <LogOut className="mr-2 h-4 w-4" /> {!collapsed && 'Sign Out'}
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center border-b border-border px-4 bg-card">
          <SidebarTrigger className="mr-4" />
          <h1 className="font-display text-lg font-semibold text-foreground capitalize">{role} Dashboard</h1>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate(`/dashboard/${role}/alerts`)}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">3</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-background">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  );
}
