"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Package,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useGlobalSidebar } from "../../context/SidebarContext";

const paths = {
  dashboard: "/dashboard",
  products: "/inventory/products",
  categories: "/inventory/categories",
} as const;

const navAmbient =
  "transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-px hover:shadow-[0_12px_32px_-10px_rgba(15,23,42,0.08)] active:translate-y-0";

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className={cn(
        "px-3 pb-2 pt-6 font-ochre-ui text-[10px] font-semibold uppercase tracking-wider",
        "text-[#eaf1ff]/45 first:pt-0",
      )}
    >
      {children}
    </p>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen: isExpanded, toggle } = useGlobalSidebar();
  const inventoryFlyoutId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inventoryChildActive =
    pathname === paths.products || pathname === paths.categories;
  const dashboardActive = pathname === paths.dashboard;

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

  const onInventoryKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
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
      <div
        className={cn(
          "flex items-center gap-2 border-b border-[#0f172a]/25 px-3 py-4 transition-[padding] duration-300",
          !isExpanded && "flex-col gap-3",
        )}
      >
        <div
          className={cn(
            "min-w-0 flex-1 transition-opacity duration-300",
            !isExpanded && "flex w-full justify-center",
          )}
        >
          {isExpanded ? (
            <span
              className="font-ochre-brand text-2xl font-semibold leading-8 tracking-tight text-[#eaf1ff]"
              style={{ fontFeatureSettings: '"lnum" 1' }}
            >
              E-Cashier
            </span>
          ) : (
            <>
              <span className="sr-only">E-Cashier</span>
              <span
                className="font-ochre-brand text-xl font-semibold leading-none text-[#eaf1ff]"
                aria-hidden
              >
                E
              </span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border border-[#eaf1ff]/10",
            "bg-[#0f172a]/15 text-[#eaf1ff]/90 transition-[color,background-color,box-shadow] duration-300",
            "hover:bg-[#0f172a]/25 hover:shadow-[0_10px_24px_-8px_rgba(15,23,42,0.12)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#894d0d]",
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="size-4" strokeWidth={1.75} />
          ) : (
            <ChevronRight className="size-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-col overflow-visible px-2 pb-4 pt-2"
        aria-label="Main"
      >
        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-col overflow-y-auto overflow-x-hidden",
            isExpanded && "min-h-0 flex-1",
          )}
        >
          {isExpanded && <SectionLabel>Management</SectionLabel>}

          <Link
            href={paths.dashboard}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#eaf1ff]/90 outline-none",
              navAmbient,
              dashboardActive &&
                "bg-[#894d0d]/25 text-[#eaf1ff] shadow-[inset_0_0_0_1px_rgba(137,77,13,0.35)]",
              !isExpanded && "justify-center px-0",
            )}
            title={!isExpanded ? "Dashboard" : undefined}
          >
            <LayoutGrid
              className="size-5.5 shrink-0 opacity-90"
              strokeWidth={1.5}
            />
            {isExpanded && <span>Dashboard</span>}
          </Link>

          {isExpanded ? (
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
                <Package
                  className="size-5.5 shrink-0 opacity-90"
                  strokeWidth={1.5}
                />
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
          ) : null}
        </div>

        {!isExpanded ? (
          <div
            className="relative mt-1 shrink-0"
            onMouseEnter={openInventoryFlyout}
            onMouseLeave={scheduleCloseInventoryFlyout}
            onFocusCapture={openInventoryFlyout}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setInventoryFlyoutOpen(false);
              }
            }}
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
              aria-haspopup="true"
              aria-expanded={inventoryFlyoutOpen}
              aria-controls={inventoryFlyoutId}
              onKeyDown={onInventoryKeyDown}
              title="Inventory"
            >
              <Package
                className="size-5.5 shrink-0 opacity-90"
                strokeWidth={1.5}
              />
            </button>

            {inventoryFlyoutOpen ? (
              <div
                id={inventoryFlyoutId}
                role="menu"
                className={cn(
                  "absolute start-full top-0 z-[9999] ms-2 min-w-42 rounded-lg border border-[#0f172a]/30",
                  "bg-[#27313e] bg-linear-to-b from-[#2c3644] to-[#27313e] py-2",
                  "shadow-[0_16px_40px_-12px_rgba(15,23,42,0.45)]",
                )}
                onMouseEnter={openInventoryFlyout}
                onMouseLeave={scheduleCloseInventoryFlyout}
              >
                <p className="px-3 pb-1.5 font-ochre-ui text-[10px] font-semibold uppercase tracking-wider text-[#eaf1ff]/45">
                  Inventory
                </p>
                <div className="space-y-0.5 px-1.5" role="none">
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
            ) : null}
          </div>
        ) : null}
      </nav>
    </aside>
  );
}

function InventorySubLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative block rounded-lg py-2 ps-3 pe-2 text-[#eaf1ff]/85 outline-none",
        navAmbient,
        active &&
          "bg-[#894d0d]/28 font-medium text-[#eaf1ff] shadow-[inset_0_0_0_1px_rgba(137,77,13,0.4)]",
      )}
    >
      {label}
    </Link>
  );
}

function CollapsedFlyoutLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className={cn(
        "block rounded-lg px-2.5 py-2 text-sm text-[#eaf1ff]/90 outline-none",
        navAmbient,
        active &&
          "bg-[#894d0d]/28 font-medium text-[#eaf1ff] shadow-[inset_0_0_0_1px_rgba(137,77,13,0.4)]",
      )}
    >
      {label}
    </Link>
  );
}
