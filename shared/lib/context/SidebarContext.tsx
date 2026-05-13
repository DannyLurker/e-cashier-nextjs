"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { internalServerError } from "../error-handlers";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
        {children}
      </SidebarContext.Provider>
    </>
  );
};

export const useGlobalSiderbar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw internalServerError(
      "useGlobalSidebar must be used within SiderbarProvider",
    );
  return context;
};
