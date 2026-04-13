import { getAssuranceData } from "@/lib/data";

export default function DashboardOverview() {
  const { latest, supplyChain } = getAssuranceData();
  
  const commit = latest?.git?.commit_sha?.substring(0, 7) || "unknown";
  
  let semgrepStatus = latest?.static_analysis?.semgrep?.status;
  let cargoAuditStatus = supplyChain?.rust?.status;
  let npmAuditTotal = supplyChain?.npm?.vulnerabilities?.total || 0;
  
  const isPassing = semgrepStatus === "ok" && cargoAuditStatus === "ok";

  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "32px", fontFamily: "var(--font-serif)" }}>Security Posture</h1>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "24px",
        marginBottom: "32px"
      }}>
        {/* Posture Score */}
        <div className="whisper-shadow bg-surface" style={{ padding: "24px", borderRadius: "var(--radius-xl)" }}>
          <h2 style={{ fontSize: "20px", color: "var(--text-secondary)", marginBottom: "16px" }}>Overall Score</h2>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span style={{ fontSize: "64px", fontFamily: "var(--font-serif)" }}>82</span>
            <span style={{ color: "var(--text-tertiary)" }}>/100</span>
          </div>
          
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>L1 Program Logic</span>
              <strong style={{ color: "var(--status-pass)" }}>A</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-tertiary)" }}>
              <span>L3 Chain State</span>
              <strong style={{ color: "var(--status-skip)" }}>—</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>L6 Supply Chain</span>
              <strong style={{ color: npmAuditTotal > 0 ? "var(--severity-medium)" : "var(--status-pass)" }}>
                {npmAuditTotal > 0 ? "B" : "A"}
              </strong>
            </div>
          </div>
        </div>

        {/* Latest Run */}
        <div className="whisper-shadow bg-surface" style={{ padding: "24px", borderRadius: "var(--radius-xl)" }}>
          <h2 style={{ fontSize: "20px", color: "var(--text-secondary)", marginBottom: "16px" }}>Latest Assurance Run</h2>
          <p style={{ margin: "0 0 8px" }}>
            <strong>Commit:</strong> <code style={{ color: "var(--brand-terracotta)", fontFamily: "var(--font-mono)" }}>{commit}</code>
          </p>
          <p style={{ margin: "0 0 24px" }}>
            <strong>Status:</strong> <span style={{ color: isPassing ? "var(--status-pass)" : "var(--severity-high)" }}>{isPassing ? "Passing" : "Issues Found"}</span>
          </p>
          
          {latest && (
            <div style={{ fontSize: "14px" }}>
              <p style={{ margin: "0 0 4px", color: "var(--text-secondary)" }}>
                Static Analysis: <span style={{ color: semgrepStatus === "ok" ? "var(--status-pass)" : "var(--status-fail)" }}>{semgrepStatus}</span>
              </p>
              <p style={{ margin: "0 0 4px", color: "var(--text-secondary)" }}>
                 Rust Supply Chain: <span style={{ color: cargoAuditStatus === "ok" ? "var(--status-pass)" : "var(--status-skip)" }}>{cargoAuditStatus}</span>
              </p>
              <p style={{ margin: "0", color: "var(--text-secondary)" }}>
                 NPM Supply Chain: <span style={{ color: npmAuditTotal > 0 ? "var(--severity-medium)" : "var(--status-pass)" }}>{npmAuditTotal} vulnerabilities</span>
              </p>
            </div>
          )}
          {!latest && (
            <p style={{ margin: "0 0 8px", color: "var(--text-secondary)", fontSize: "14px" }}>
              No manifest data found. Run the CLI to generate a manifest.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
