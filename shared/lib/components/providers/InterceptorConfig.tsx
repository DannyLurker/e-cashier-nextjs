"use client";
import { useEffect } from "react";
import { registerApiListeners } from "@/shared/lib/api-client";
import { useUI } from "../../context/UiContext";
import { toast } from "sonner";

export function InterceptorConfig() {
  const { setIsLoading } = useUI();

  useEffect(() => {
    registerApiListeners(setIsLoading, (msg: string) => {
      toast.error(msg);
    });
  }, [setIsLoading, toast]);

  return null;
}
