// Real-time multi-tab synchronization using BroadcastChannel, StorageEvent, and Visibility/Focus listeners

export type SyncMessage =
  | { type: "PROJECTS_UPDATED"; payload?: unknown }
  | { type: "LEADS_UPDATED"; payload?: unknown }
  | { type: "REFRESH_ALL" };

const CHANNEL_NAME = "solycal_crm_realtime_sync";

/**
 * Broadcast an update event to all other tabs/windows of the CRM instantly.
 */
export function broadcastSync(msg: SyncMessage): void {
  if (typeof window === "undefined") return;

  try {
    if ("BroadcastChannel" in window) {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage(msg);
      bc.close();
    }
  } catch (err) {
    console.warn("BroadcastChannel postMessage error:", err);
  }

  // Trigger cross-tab storage event as universal fallback
  try {
    localStorage.setItem("solycal_crm_sync_ping", String(Date.now()));
  } catch {}
}

/**
 * Subscribe to real-time events across all tabs, window focus, visibility change, and storage updates.
 */
export function subscribeToSync(onMessage: (msg: SyncMessage) => void): () => void {
  if (typeof window === "undefined") return () => {};

  let bc: BroadcastChannel | null = null;
  try {
    if ("BroadcastChannel" in window) {
      bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data) {
          onMessage(event.data);
        }
      };
    }
  } catch (err) {
    console.warn("BroadcastChannel init error:", err);
  }

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === "solycal_crm_sync_ping" ||
      event.key === "solycal_crm_projects_cache" ||
      event.key === "solycal_crm_leads_cache" ||
      event.key === "solycal_kanban_cards_cache"
    ) {
      onMessage({ type: "REFRESH_ALL" });
    }
  };

  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      onMessage({ type: "REFRESH_ALL" });
    }
  };

  const handleFocus = () => {
    onMessage({ type: "REFRESH_ALL" });
  };

  window.addEventListener("storage", handleStorage);
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("focus", handleFocus);

  return () => {
    if (bc) {
      try {
        bc.close();
      } catch {}
    }
    window.removeEventListener("storage", handleStorage);
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("focus", handleFocus);
  };
}
