import { describe, it, expect, beforeEach } from "vitest";
import { useUIStore } from "@/lib/store";

describe("useUIStore", () => {
  beforeEach(() => {
    useUIStore.setState({ sidebarOpen: false });
  });

  it("starts with sidebar closed", () => {
    const state = useUIStore.getState();
    expect(state.sidebarOpen).toBe(false);
  });

  it("toggles sidebar open and closed", () => {
    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);

    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
  });

  it("sets sidebar open explicitly", () => {
    useUIStore.getState().setSidebarOpen(true);
    expect(useUIStore.getState().sidebarOpen).toBe(true);

    useUIStore.getState().setSidebarOpen(false);
    expect(useUIStore.getState().sidebarOpen).toBe(false);
  });
});
