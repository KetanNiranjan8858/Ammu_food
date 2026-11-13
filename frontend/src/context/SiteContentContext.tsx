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

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultData as SiteContent);
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
        if (data.success && data.content) {
          setContent(data.content);
        }
      }
    } catch (err) {
      console.warn("Could not fetch latest site content, using local defaults:", err);
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
      if (e.key === "ammu_content_timestamp") {
        refreshContent();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshContent]);

  // Save changes to disk
  const updateContent = async (newContent: SiteContent): Promise<boolean> => {
    try {
      setIsSaving(true);
      setSaveMessage(null);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      });

      if (!res.ok) {
        throw new Error("Failed to save changes to server");
      }

      const data = await res.json();
      if (data.success) {
        const saved = data.content || newContent;
        setContent(saved);
        setSaveMessage("All changes saved and live on website!");
        setTimeout(() => setSaveMessage(null), 4000);

        // Broadcast to other open tabs immediately
        if (typeof window !== "undefined") {
          try {
            const channel = new BroadcastChannel("ammu_content_sync");
            channel.postMessage({ type: "CONTENT_UPDATED", content: saved });
            channel.close();
            localStorage.setItem("ammu_content_timestamp", String(Date.now()));
          } catch (e) {}
        }

        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Save content failed:", err);
      setSaveMessage("Error: " + (err.message || "Failed to save"));
      setTimeout(() => setSaveMessage(null), 5000);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const resetToDefaults = async (): Promise<boolean> => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/content?reset=true", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.content) {
          setContent(data.content);
          setSaveMessage("Reset to factory defaults successfully!");
          setTimeout(() => setSaveMessage(null), 4000);

          if (typeof window !== "undefined") {
            try {
              const channel = new BroadcastChannel("ammu_content_sync");
              channel.postMessage({ type: "CONTENT_UPDATED", content: data.content });
              channel.close();
              localStorage.setItem("ammu_content_timestamp", String(Date.now()));
            } catch (e) {}
          }

          return true;
        }
      }
      return false;
    } catch (err: any) {
      console.error("Reset failed:", err);
      return false;
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

