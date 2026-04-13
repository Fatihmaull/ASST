"use client";

import { useState } from "react";

export default function RunsTable({ manifests }: { manifests: any[] }) {
  const [selectedManifest, setSelectedManifest] = useState<any>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedManifest(null);
    }
  };

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", fontSize: "14px" }}>
            <th style={{ padding: "16px 24px", fontWeight: "normal" }}>Date</th>
            <th style={{ padding: "16px 24px", fontWeight: "normal" }}>Commit / Ref</th>
            <th style={{ padding: "16px 24px", fontWeight: "normal" }}>Tools Ran</th>
            <th style={{ padding: "16px 24px", fontWeight: "normal" }}>Status</th>
            <th style={{ padding: "16px 24px", fontWeight: "normal", textAlign: "right" }}></th>
          </tr>
        </thead>
        <tbody>
          {manifests.length > 0 ? manifests.map((m: any, i: number) => {
            const isPassing = m.static_analysis?.semgrep?.status === "ok" || typeof m.static_analysis?.semgrep?.status === "undefined";
            
            return (
              <tr 
                key={i} 
                onClick={() => setSelectedManifest(m)}
                style={{ 
                  borderBottom: "1px solid var(--border-light)", 
                  cursor: "pointer",
                  transition: "background 0.2s" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td suppressHydrationWarning style={{ padding: "16px 24px", color: "var(--text-primary)" }}>
                  {new Date(m.generated_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <code style={{ color: "var(--brand-terracotta)", fontFamily: "var(--font-mono)" }}>
                      {m.git?.commit_sha?.substring(0, 7) || "unknown"}
                    </code>
                    <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{m.git?.ref}</span>
                  </div>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--text-secondary)" }}>
                  {m.tools?.map((t: any) => t.name).join(", ") || "none"}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--bg-elevated)", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontSize: "12px", color: isPassing ? "var(--status-pass)" : "var(--severity-high)" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }}></span>
                    {isPassing ? "Passing" : "Failed"}
                  </div>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right", color: "var(--brand-coral)" }}>
                  <span>View Manifest →</span>
                </td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
                No runs found in the assurance directory.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedManifest && (
        <div 
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(20, 20, 19, 0.7)", 
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px"
          }}
        >
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            width: "100%",
            maxWidth: "800px",
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
            animation: "fadeInUp 0.3s ease-out"
          }}>
            <div style={{ padding: "24px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span suppressHydrationWarning style={{ 
                    color: "var(--text-secondary)", 
                    fontFamily: "var(--font-mono)", 
                    fontSize: "13px" 
                  }}>
                    {new Date(selectedManifest.generated_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <h2 style={{ fontSize: "20px", color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}>
                  Assurance Manifest Export
                </h2>
              </div>
              <button 
                onClick={() => setSelectedManifest(null)}
                style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "20px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: "24px", overflowY: "auto", background: "var(--bg-base)" }}>
              <pre style={{ 
                margin: 0,
                color: "var(--text-secondary)", 
                fontFamily: "var(--font-mono)", 
                fontSize: "13px", 
                whiteSpace: "pre-wrap",
                wordBreak: "break-all"
              }}>
                {JSON.stringify(selectedManifest, null, 2)}
              </pre>
            </div>
            
            <div style={{ padding: "16px 24px", background: "var(--bg-elevated)", borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setSelectedManifest(null)}
                style={{ 
                  background: "var(--brand-coral)", 
                  color: "white", 
                  border: "none", 
                  padding: "8px 16px", 
                  borderRadius: "var(--radius-md)", 
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
