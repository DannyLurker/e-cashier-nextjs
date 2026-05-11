"use client";
import React, { createContext, useContext, useState } from "react";
import { Loader2 } from "lucide-react";

const UIContext = createContext({
  setIsLoading: (loading: boolean) => {},
});

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UIContext.Provider value={{ setIsLoading }}>
      {children}

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-auto flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-6 shadow-xl">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              Processing...
            </p>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
