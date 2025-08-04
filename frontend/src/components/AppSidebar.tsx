import { Upload, Download, Search, History, User, Crown, UserCircle, Home } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { PremiumModal } from "./PremiumModal";

const navigation = [
  { title: "Home", url: "/", icon: Home },
  { title: "My Profile", url: "/profile", icon: UserCircle },
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "Download", url: "/download", icon: Download },
  { title: "Search", url: "/search", icon: Search },
  { title: "History", url: "/history", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    return currentPath.startsWith(path) && path !== "/";
  };

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
      active 
        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/20" 
        : "hover:bg-accent hover:text-accent-foreground hover:shadow-md"
    }`;
  };

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-sidebar`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Premium Button */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={() => setShowPremiumModal(true)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 hover:border-primary/50 hover:shadow-md hover:shadow-primary/25 text-primary w-full"
                  >
                    <Crown className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="font-medium">Upgrade to Premium</span>
                    )}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)} 
      />
    </Sidebar>
  );
}