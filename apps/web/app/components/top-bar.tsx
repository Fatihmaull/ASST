export function TopBar() {
  return (
    <header style={{
      height: "64px",
      borderBottom: "1px solid var(--border-light)",
      backgroundColor: "var(--bg-parchment)",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      justifyContent: "space-between"
    }}>
      <div>
        <h3 style={{ margin: 0, color: "var(--text-secondary)", fontSize: "16px", fontWeight: "400" }}>Command Center</h3>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-secondary)",
          fontSize: "14px"
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--status-pass)"
          }} />
          System Active
        </div>
      </div>
    </header>
  );
}
