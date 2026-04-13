import { Sidebar } from "@/app/components/sidebar";
import { TopBar } from "@/app/components/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <main style={{ flex: 1, padding: "32px 48px", overflowY: "auto", position: "relative" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
