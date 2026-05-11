"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InterceptorConfig } from "@/shared/lib/components/providers/InterceptorConfig";
import { Toaster } from "sonner";
import { UIProvider } from "@/shared/lib/context/UiContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <UIProvider>
        <InterceptorConfig />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster position="bottom-right" />
      </UIProvider>
    </SessionProvider>
  );
}
