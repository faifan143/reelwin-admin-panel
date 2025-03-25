"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlayCircle,
  Tag,
  Gift,
  ChevronRight,
  ChevronLeft,
  Award,
  X,
} from "lucide-react";
import { useThemeStore } from "@/utils/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { language } = useThemeStore();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isRtl = language === "ar";

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(e.target as Node) && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    // Listen for toggle sidebar event
    const handleToggleSidebar = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsMobileOpen(customEvent.detail);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.addEventListener("toggle-sidebar", handleToggleSidebar);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.removeEventListener("toggle-sidebar", handleToggleSidebar);
    };
  }, [isMobileOpen]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const links: SidebarLink[] = [
    {
      href: "/dashboard",
      label: t("dashboard.title"),
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/dashboard/content",
      label: t("dashboard.content"),
      icon: <PlayCircle size={20} />,
    },
    {
      href: "/dashboard/interests",
      label: t("dashboard.interests"),
      icon: <Tag size={20} />,
    },
    {
      href: "/dashboard/rewards",
      label: t("dashboard.rewards"),
      icon: <Award size={20} />,
    },
    {
      href: "/dashboard/gems",
      label: t("dashboard.gems"),
      icon: <Gift size={20} />,
    },
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "bg-card border-r fixed md:sticky top-0 bottom-0 w-[280px] z-50 flex flex-col transition-all duration-300 ease-in-out",
          collapsed && "w-[80px]",
          isMobileOpen ? "left-0" : "-left-[280px]",
          isRtl ? (isMobileOpen ? "right-0" : "-right-[280px]") : "",
          "md:left-0 md:right-auto h-screen"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b h-[61px]">
          <div
            className={cn(
              "flex items-center gap-2",
              collapsed && "justify-center w-full"
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <span className="text-primary font-semibold text-sm">R</span>
            </div>
            {!collapsed && <span className="font-bold text-lg">ReelWin</span>}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn("md:flex", collapsed && "hidden")}
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5 md:hidden" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* Sidebar links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {links.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      collapsed && "justify-center"
                    )}
                  >
                    {link.icon}
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse button */}
        <div className="p-4 border-t hidden md:block">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-between"
            onClick={toggleCollapse}
          >
            {!collapsed && (
              <span className="text-sm text-muted-foreground">
                {isRtl ? "طي" : "Collapse"}
              </span>
            )}
            {isRtl ? (
              collapsed ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
