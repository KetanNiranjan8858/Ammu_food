"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import defaultData from "@/data/site-content.json";

interface SiteContentContextType {
  content: SiteContent;
  loading: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  updateContent: (newContent: SiteContent) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  refreshContent: () => Promise<void>;
}

const STORAGE_KEY = "ammu_site_content_override";
const TIMESTAMP_KEY = "ammu_content_timestamp";

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  // Initialize with local storage if available to prevent flash of old content
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed && parsed.products && Array.isArray(parsed.products)) {
            return parsed;
          }
        }
      } catch (e) {}
    }
    return defaultData as SiteContent;
  });

  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Fetch from server on mount
  const refreshContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content && data.content.products) {
          // If server has stored content (from Vercel KV, serverless /tmp or disk), sync it
          if (data.storage === "vercel_kv" || data.storage === "active" || data.storage === "tmp" || data.storage === "disk") {
            setContent(data.content);
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.content));
              } catch (e) {}
            }
          } else {
            // Server returned default bundled content: check if local storage has newer edits
            if (typeof window !== "undefined") {
              const local = localStorage.getItem(STORAGE_KEY);
              if (local) {
                const parsed = JSON.parse(local);
                if (parsed && parsed.products) {
                  setContent(parsed);
                  return;
                }
              }
            }
            setContent(data.content);
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch site content from server, using client cached data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();

    if (typeof window === "undefined") return;

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel("ammu_content_sync");
      channel.onmessage = (event) => {
        if (event.data?.type === "CONTENT_UPDATED" && event.data?.content) {
          setContent(event.data.content);
        }
      };
    } catch (e) {
      // BroadcastChannel optional fallback
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === TIMESTAMP_KEY || e.key === STORAGE_KEY) {
        try {
          const local = localStorage.getItem(STORAGE_KEY);
          if (local) {
            setContent(JSON.parse(local));
          } else {
            refreshContent();
          }
        } catch (err) {}
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshContent]);

  // Save changes to client storage and server
  const updateContent = async (newContent: SiteContent): Promise<boolean> => {
    try {
      setIsSaving(true);
      setSaveMessage(null);

      // 1. Instantly apply to local state & browser storage so marketing page updates immediately
      setContent(newContent);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
          localStorage.setItem(TIMESTAMP_KEY, String(Date.now()));

          // Broadcast to all other open tabs (marketing page, products page, etc.)
          const channel = new BroadcastChannel("ammu_content_sync");
          channel.postMessage({ type: "CONTENT_UPDATED", content: newContent });
          channel.close();
        } catch (e) {
          console.warn("Local storage write warning:", e);
        }
      }

      // 2. Persist to server (Vercel KV / serverless / disk)
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });

      if (res.ok) {
        const data = await res.json();
        const saved = data.content || newContent;
        setContent(saved);
        setSaveMessage("All changes saved and live on website!");
        setTimeout(() => setSaveMessage(null), 4000);
        return true;
      } else {
        // Even if server responded with non-200, client has local state saved
        setSaveMessage("Saved to browser session. (Connect Vercel KV for multi-device sync)");
        setTimeout(() => setSaveMessage(null), 5000);
        return true;
      }
    } catch (err: any) {
      console.warn("Server save notice:", err);
      // Saved in browser
      setSaveMessage("Saved to this browser session!");
      setTimeout(() => setSaveMessage(null), 4000);
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const resetToDefaults = async (): Promise<boolean> => {
    try {
      setIsSaving(true);
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.setItem(TIMESTAMP_KEY, String(Date.now()));
          const channel = new BroadcastChannel("ammu_content_sync");
          channel.postMessage({ type: "CONTENT_UPDATED", content: defaultData });
          channel.close();
        } catch (e) {}
      }
      setContent(defaultData as SiteContent);

      const res = await fetch("/api/content?reset=true", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          setContent(data.content);
        }
      }

      setSaveMessage("Reset to factory defaults successfully!");
      setTimeout(() => setSaveMessage(null), 4000);
      return true;
    } catch (err: any) {
      console.error("Reset failed:", err);
      setContent(defaultData as SiteContent);
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        loading,
        isSaving,
        saveMessage,
        updateContent,
        resetToDefaults,
        refreshContent,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
