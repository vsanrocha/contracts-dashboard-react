import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart2,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Contracts", href: "/contracts" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-background border-r transition-all duration-300 fixed lg:relative z-50",
        collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <span className="text-xl font-semibold">Contract Hub</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2" : "px-4",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
