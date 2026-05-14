"use client";

import { Package, ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import InventorySubLink from "./InventorySubLink";
import CollapsedFlyoutLink from "./ColapsedFlyoutLink";
import { navAmbient } from "../sidebar-link.styles";

interface SidebarInventoryProps {
  isExpanded: boolean;
  pathname: string;
  paths: { products: string; categories: string };
  inventoryOpen: boolean;
  setInventoryOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
  inventoryFlyoutOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  inventoryFlyoutId: string;
}

export default function SidebarInventory({
  isExpanded,
  pathname,
  paths,
  inventoryOpen,
  setInventoryOpen,
  inventoryFlyoutOpen,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  inventoryFlyoutId,
}: SidebarInventoryProps) {
  const inventoryChildActive =
    pathname === paths.products || pathname === paths.categories;

  if (isExpanded) {
    return (
      <div className="mt-1">
        <button
          type="button"
          onClick={() => setInventoryOpen((o) => !o)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[#eaf1ff]/90 outline-none",
            navAmbient,
            (inventoryOpen || inventoryChildActive) &&
              "bg-[#0f172a]/20 text-[#eaf1ff]",
          )}
          aria-expanded={inventoryOpen}
        >
          <Package className="size-5.5 shrink-0 opacity-90" strokeWidth={1.5} />
          <span className="min-w-0 flex-1">Inventory</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform duration-300",
              inventoryOpen && "rotate-180",
            )}
            strokeWidth={1.75}
          />
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            inventoryOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="relative ms-3 mt-1 border-s border-[#eaf1ff]/12 ps-3">
              <div className="space-y-1 pb-1 pt-0.5">
                <InventorySubLink
                  href={paths.products}
                  label="Products"
                  active={pathname === paths.products}
                />
                <InventorySubLink
                  href={paths.categories}
                  label="Categories"
                  active={pathname === paths.categories}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative mt-1 shrink-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-center rounded-lg py-2.5 text-[#eaf1ff]/90 outline-none",
          navAmbient,
          inventoryChildActive &&
            "bg-[#894d0d]/25 text-[#eaf1ff] shadow-[inset_0_0_0_1px_rgba(137,77,13,0.35)]",
          inventoryFlyoutOpen && "bg-[#0f172a]/25",
        )}
        onKeyDown={onKeyDown}
        title="Inventory"
      >
        <Package className="size-5.5 shrink-0 opacity-90" strokeWidth={1.5} />
      </button>

      {inventoryFlyoutOpen && (
        <div
          id={inventoryFlyoutId}
          className="absolute start-full top-0 z-[9999] ms-2 min-w-42 rounded-lg border border-[#0f172a]/30 bg-[#27313e] py-2 shadow-xl"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#eaf1ff]/45">
            Inventory
          </p>
          <div className="space-y-0.5 px-1.5">
            <CollapsedFlyoutLink
              href={paths.products}
              label="Products"
              active={pathname === paths.products}
            />
            <CollapsedFlyoutLink
              href={paths.categories}
              label="Categories"
              active={pathname === paths.categories}
            />
          </div>
        </div>
      )}
    </div>
  );
}
