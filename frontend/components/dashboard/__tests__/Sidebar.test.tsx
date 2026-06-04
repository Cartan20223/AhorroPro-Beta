import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useUIStore } from "@/lib/store";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("Sidebar", () => {
  beforeEach(() => {
    useUIStore.setState({ sidebarOpen: false });
  });

  it("renders all navigation items with visible labels", () => {
    render(<Sidebar />);
    expect(screen.getAllByText("Dashboard").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Logros").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Historial").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Metas").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Ajustes").length).toBeGreaterThanOrEqual(1);
  });

  it("renders nav links with correct hrefs", () => {
    render(<Sidebar />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/dashboard");
    expect(hrefs).toContain("/logros");
    expect(hrefs).toContain("/history");
    expect(hrefs).toContain("/achievements");
    expect(hrefs).toContain("/settings");
  });

  it("highlights active route", () => {
    render(<Sidebar />);
    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink.className).toContain("from-purple-500");
  });
});
