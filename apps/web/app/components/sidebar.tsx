import Link from "next/link";

export function Sidebar() {
  return (
    <aside style={{
      width: "240px",
      borderRight: "1px solid var(--border-light)",
      backgroundColor: "var(--bg-parchment)",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0
    }}>
      <div style={{ padding: "24px 20px" }}>
        <h2 style={{ color: "var(--text-primary)", fontSize: "24px", margin: 0, fontFamily: "var(--font-serif)" }}>ASST</h2>
      </div>
      <nav style={{ flex: 1, padding: "0 12px" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "4px" }}>
            <Link href="/dashboard" style={{ display: "block", padding: "8px 12px", color: "var(--text-primary)", borderRadius: "var(--radius-md)", backgroundColor: "var(--bg-surface)" }}>
              Overview
            </Link>
          </li>
          <li style={{ marginBottom: "4px" }}>
            <Link href="/dashboard/runs" style={{ display: "block", padding: "8px 12px", color: "var(--text-secondary)", borderRadius: "var(--radius-md)" }}>
              Runs
            </Link>
          </li>
          <li style={{ marginBottom: "4px" }}>
            <Link href="/dashboard/findings" style={{ display: "block", padding: "8px 12px", color: "var(--text-secondary)", borderRadius: "var(--radius-md)" }}>
              Findings
            </Link>
          </li>
          <li style={{ marginBottom: "4px" }}>
            <Link href="/dashboard/console" style={{ display: "block", padding: "8px 12px", color: "var(--text-secondary)", borderRadius: "var(--radius-md)" }}>
              Agent Console
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
