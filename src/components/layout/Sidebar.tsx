import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  userName = "John Doe",
  userRole = "Supply Chain Manager",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <Package size={20} />,
      path: "/inventory",
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/orders",
    },
    {
      id: "suppliers",
      label: "Suppliers",
      icon: <Users size={20} />,
      path: "/suppliers",
    },
    {
      id: "logistics",
      label: "Logistics",
      icon: <Truck size={20} />,
      path: "/logistics",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart3 size={20} />,
      path: "/reports",
    },
  ];

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
      path: "/help",
    },
  ];

  return (
    <aside
      className={cn(
        "h-full bg-background border-r flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Logo and Brand */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold">SCM</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg">SupplyChain ERP</span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronRight
            size={18}
            className={cn(
              "transition-transform",
              collapsed ? "rotate-0" : "rotate-180",
            )}
          />
        </button>
      </div>

      <Separator />

      {/* User Profile */}
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userRole}</p>
          </div>
        )}
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        activeItem === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto">
        <Separator />
        <ul className="p-2 space-y-1">
          {bottomMenuItems.map((item) => (
            <li key={item.id}>
              <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        activeItem === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}

          {/* Logout Button */}
          <li>
            <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <span className="flex-shrink-0">
                      <LogOut size={20} />
                    </span>
                    {!collapsed && <span>Logout</span>}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Logout</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
