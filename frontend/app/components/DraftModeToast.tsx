"use client";

import {
  useDraftModeEnvironment,
  useIsPresentationTool,
} from "next-sanity/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { disableDraftMode } from "@/app/actions";

export default function DraftModeToast() {
  const isPresentationTool = useIsPresentationTool();
  const env = useDraftModeEnvironment();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const toastIdRef = useRef<string | number | null>(null);
  const [isInIframe, setIsInIframe] = useState<boolean | null>(null);

  // Check if we're in an iframe (presentation tool) or opened from presentation tool
  useEffect(() => {
    if (typeof window !== "undefined") {
      const inIframe = window.self !== window.top;
      // Also check if URL has presentation tool parameters or if referrer is from Sanity Studio
      const hasPresentationParams = 
        window.location.search.includes("sanity-preview-perspective") ||
        window.location.search.includes("sanity-preview") ||
        document.referrer.includes("/presentation/");
      
      setIsInIframe(inIframe || hasPresentationParams);
    }
  }, []);

  useEffect(() => {
    // Don't show toast if:
    // 1. We're in presentation tool (isPresentationTool === true)
    // 2. We're in an iframe (likely presentation tool)
    // 3. isPresentationTool is still being determined (null/undefined)
    const shouldHideToast = 
      isPresentationTool === true || 
      isInIframe === true ||
      isPresentationTool === null ||
      isPresentationTool === undefined;

    if (shouldHideToast) {
      // If we're in presentation tool or iframe, dismiss any existing toast
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
      return;
    }

    // Only show toast if we're definitely NOT in presentation tool and NOT in iframe
    if (isPresentationTool === false && isInIframe === false) {
      // Dismiss any existing toast first
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
      
      /**
       * We delay the toast in case we're inside Presentation Tool
       */
      const toastId = toast("Draft Mode Enabled", {
        description:
          env === "live"
            ? "Content is live, refreshing automatically"
            : "Refresh manually to see changes",
        duration: Infinity,
        action: {
          label: "Disable",
          onClick: async () => {
            await disableDraftMode();
            startTransition(() => {
              router.refresh();
            });
          },
        },
      });
      
      toastIdRef.current = toastId;
      
      return () => {
        toast.dismiss(toastId);
        toastIdRef.current = null;
      };
    }
  }, [env, router, isPresentationTool, isInIframe]);

  useEffect(() => {
    if (pending) {
      const loadingToastId = toast.loading("Disabling draft mode...");
      return () => {
        toast.dismiss(loadingToastId);
      };
    }
  }, [pending]);

  return null;
}
