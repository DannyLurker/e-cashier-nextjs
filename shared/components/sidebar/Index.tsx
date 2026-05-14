"use client";

import { useGlobalSidebar } from "@/shared/lib/context/SidebarContext";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";
import SidebarLogo from "./SidebarLogo";
import SectionLabel from "./sub-components/SecitionLabel";
import SidebarDashboardLink from "./sub-components/SidebarDashboardLink";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { LayoutGrid } from "lucide-react";
import SidebarInventory from "./sub-components/SidebarInventory";
const paths = {
  dashboard: "/dashboard",
  products: "/inventory/products",
  categories: "/inventory/categories",
} as const;

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen: isExpanded, toggle } = useGlobalSidebar();
  const inventoryFlyoutId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inventoryChildActive =
    pathname === paths.products || pathname === paths.categories;

  const [inventoryOpen, setInventoryOpen] = useState(
    inventoryChildActive || pathname.startsWith("/inventory"),
  );
  const [inventoryFlyoutOpen, setInventoryFlyoutOpen] = useState(false);

  useEffect(() => {
    if (inventoryChildActive) setInventoryOpen(true);
  }, [inventoryChildActive]);

  useEffect(() => {
    if (isExpanded) setInventoryFlyoutOpen(false);
  }, [isExpanded]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openInventoryFlyout = useCallback(() => {
    if (isExpanded) return;
    clearCloseTimer();
    setInventoryFlyoutOpen(true);
  }, [clearCloseTimer, isExpanded]);

  const scheduleCloseInventoryFlyout = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setInventoryFlyoutOpen(false), 140);
  }, [clearCloseTimer]);

  const onInventoryKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isExpanded && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setInventoryFlyoutOpen((v) => !v);
    }
  };

  return (
    <aside
      className={cn(
        "relative flex min-h-screen h-full shrink-0 flex-col overflow-visible border-e border-[#0f172a]/20",
        "bg-[#27313e] bg-linear-to-b from-[#2c3644] to-[#27313e] text-[#eaf1ff]",
        "font-ochre-ui text-sm leading-5 transition-[width] duration-300 ease-out",
        isExpanded ? "w-65" : "w-18",
      )}
      data-expanded={isExpanded ? "true" : "false"}
    >
      <SidebarLogo isExpanded={isExpanded} toggle={toggle} />

      <nav className="flex min-h-0 flex-1 flex-col overflow-visible px-2 pb-4 pt-2">
        {/* SCROLLABLE AREA */}
        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-col overflow-y-auto overflow-x-hidden",
            isExpanded && "flex-1",
          )}
        >
          {isExpanded && <SectionLabel>Management</SectionLabel>}

          <SidebarDashboardLink
            href={paths.dashboard}
            label="Dashboard"
            icon={LayoutGrid}
            isActive={pathname === paths.dashboard}
            isExpanded={isExpanded}
          />

          {isExpanded && (
            <SidebarInventory
              isExpanded={isExpanded}
              onMouseEnter={openInventoryFlyout}
              onMouseLeave={scheduleCloseInventoryFlyout}
              onKeyDown={onInventoryKeyDown}
              inventoryFlyoutId={inventoryFlyoutId}
              inventoryFlyoutOpen={inventoryFlyoutOpen}
              pathname={pathname}
              paths={paths}
              inventoryOpen={inventoryOpen}
              setInventoryOpen={setInventoryOpen}
            />
          )}
        </div>

        {/* NON-SCROLLABLE AREA (FLYOUT) */}
        {!isExpanded && (
          <SidebarInventory
            isExpanded={isExpanded}
            onMouseEnter={openInventoryFlyout}
            onMouseLeave={scheduleCloseInventoryFlyout}
            onKeyDown={onInventoryKeyDown}
            inventoryFlyoutId={inventoryFlyoutId}
            inventoryFlyoutOpen={inventoryFlyoutOpen}
            pathname={pathname}
            paths={paths}
            inventoryOpen={inventoryOpen}
            setInventoryOpen={setInventoryOpen}
          />
        )}
      </nav>
    </aside>
  );
}
