"use client";

import { useState } from "react";

export default function FindingsPage() {
  const mockFindings = [
    { 
      id: 1, 
      severity: "critical", 
      title: "Missing signer check on withdraw", 
      layer: "L1 On-chain", 
      tool: "semgrep",
      description: "The withdraw instruction does not verify that the authority account signed the transaction. This allows any user to withdraw funds from the vault by passing the expected authority account without a valid signature.",
      remediation: "Add the `Signer` constraint to the authority account in the context literal: `#[account(mut, has_one = authority)]` or use `Signer<'info>`."
    },
    { 
      id: 2, 
      severity: "high", 
      title: "Unchecked CPI return value", 
      layer: "L2 On-chain", 
      tool: "semgrep",
      description: "A Cross-Program Invocation (CPI) to the token program does not verify the resulting `Result` type, silently swallowing potential failures.",
      remediation: "Use `anchor_lang::solana_program::program::invoke` or ensure the CpiContext properly unwraps: `token::transfer(cpi_ctx, amount)?`"
    },
    { 
      id: 3, 
      severity: "medium", 
      title: "axios < 1.15.0 transitive dependency", 
      layer: "L6 Supply", 
      tool: "pnpm audit",
      description: "A vulnerability in Axios 1.14.0 allows SSRF. It is pulled in transitively via the web workspace.",
      remediation: "Add an override in the root `package.json` to force axios 1.15.0 or run `pnpm update`."
    },
    { 
      id: 4, 
      severity: "low", 
      title: "Deprecated token API usage", 
      layer: "L4 Off-chain", 
      tool: "eslint",
      description: "Usage of `Token.createInitAccountInstruction` is deprecated in `@solana/spl-token`.",
      remediation: "Migrate to `createInitializeAccountInstruction`."
    },
    { 
      id: 5, 
      severity: "info", 
      title: "Missing doc comments on public struct", 
      layer: "L1 On-chain", 
      tool: "clippy",
      description: "The structure `VaultState` is missing Rust documentation comments.",
      remediation: "Add `///` comments explaining the state constraints."
    },
  ];

  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case "critical": return "var(--severity-critical)";
      case "high": return "var(--severity-high)";
      case "medium": return "var(--severity-medium)";
      case "low": return "var(--severity-low)";
      case "info": return "var(--severity-info)";
      default: return "var(--text-secondary)";
    }
  };

  const [selectedFinding, setSelectedFinding] = useState<typeof mockFindings[0] | null>(null);

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedFinding(null);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "32px", fontFamily: "var(--font-serif)" }}>Unified Findings</h1>
      
      <div className="whisper-shadow bg-surface" style={{ borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: "16px" }}>
          <input 
            type="text" 
            placeholder="Search findings..." 
            style={{ 
              background: "var(--bg-parchment)", 
              border: "1px solid var(--border-light)",
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              minWidth: "240px",
              outline: "none"
            }} 
          />
          <button style={{ 
            background: "var(--bg-parchment)", 
            border: "1px solid var(--border-light)",
            padding: "8px 16px",
            borderRadius: "var(--radius-md)",
            color: "var(--text-secondary)",
            cursor: "pointer"
          }}>
            Filter by Layer
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", fontSize: "14px" }}>
              <th style={{ padding: "12px 24px", fontWeight: "normal" }}>Severity</th>
              <th style={{ padding: "12px 24px", fontWeight: "normal" }}>Finding</th>
              <th style={{ padding: "12px 24px", fontWeight: "normal" }}>Layer</th>
              <th style={{ padding: "12px 24px", fontWeight: "normal" }}>Tool</th>
              <th style={{ padding: "12px 24px", fontWeight: "normal" }}></th>
            </tr>
          </thead>
          <tbody>
            {mockFindings.map((f) => (
              <tr 
                key={f.id} 
                onClick={() => setSelectedFinding(f)}
                style={{ 
                  borderBottom: "1px solid var(--border-light)", 
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontSize: "12px", fontWeight: "bold", color: getSeverityColor(f.severity) }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: getSeverityColor(f.severity) }}></span>
                    {f.severity}
                  </div>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--text-primary)", fontWeight: "500" }}>{f.title}</td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ background: "var(--bg-elevated)", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontSize: "12px", color: "var(--text-secondary)" }}>
                    {f.layer}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", color: "var(--text-secondary)", fontSize: "14px", fontFamily: "var(--font-mono)" }}>{f.tool}</td>
                <td style={{ padding: "16px 24px", textAlign: "right", color: "var(--brand-coral)" }}>
                  <span>View Details →</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFinding && (
        <div 
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(20, 20, 19, 0.7)", /* Matches brand dark theme */
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
            maxWidth: "600px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
            animation: "fadeInUp 0.3s ease-out"
          }}>
            <div style={{ padding: "24px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ 
                    color: getSeverityColor(selectedFinding.severity), 
                    textTransform: "uppercase", 
                    fontSize: "12px", 
                    fontWeight: "bold",
                    background: "var(--bg-parchment)",
                    padding: "4px 8px",
                    borderRadius: "4px"
                  }}>
                    {selectedFinding.severity}
                  </span>
                  <span style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                    Detected by {selectedFinding.tool}
                  </span>
                </div>
                <h2 style={{ fontSize: "20px", color: "var(--text-primary)", fontFamily: "var(--font-serif)" }}>
                  {selectedFinding.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedFinding(null)}
                style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "20px", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: "24px", color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "15px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "var(--text-primary)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Description</h3>
                <p>{selectedFinding.description}</p>
              </div>
              
              <div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Remediation</h3>
                <div style={{ background: "var(--bg-parchment)", padding: "16px", borderRadius: "var(--radius-md)", fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--brand-coral)" }}>
                  {selectedFinding.remediation}
                </div>
              </div>
            </div>
            
            <div style={{ padding: "16px 24px", background: "var(--bg-elevated)", borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setSelectedFinding(null)}
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
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic keyframes for the modal popup to feel snappy and satisfying */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
