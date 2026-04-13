import { createDeepAgent } from "../../libs/deepagents/src/index.ts";

import {
  createAssuranceRunChatModel,
  loadDeepagentsEnv,
} from "./assurance-llm.js";
import { gitDiffSummaryTool } from "./git-diff-summary.js";
import { mergeFindingsTool } from "./merge-findings-tool.js";
import { solanaRpcReadTool } from "./solana-rpc-read.js";
import { writeAssuranceManifestTool } from "./write-assurance-manifest-tool.js";

import { programAccountAnalyzerTool } from "./program-account-analyzer.js";
import { programUpgradeMonitorTool } from "./program-upgrade-monitor.js";
import { cpiGraphMapperTool } from "./cpi-graph-mapper.js";
import { accountStateSnapshotTool } from "./account-state-snapshot.js";
import { secretScannerTool } from "./secret-scanner.js";
import { envHygieneCheckTool } from "./env-hygiene-check.js";
import { unifiedPostureReportTool } from "./unified-posture-report.js";
import { gitCloneRepoTool } from "./git-clone-repo.js";

/**
 * Preset deep agent for Solana assurance runs (TOOLS §A–E lanes).
 * Uses LangChain `ChatOpenRouter` from `createAssuranceRunChatModel()` — **OpenRouter is required**
 * (`OPENROUTER_API_KEY` in `deepagentsjs/.env`; see `assurance-llm.ts`).
 */
export function createAssuranceRunSolanaAgent() {
  loadDeepagentsEnv();
  const model = createAssuranceRunChatModel();
  return createDeepAgent({
    model,
    systemPrompt:
      "You orchestrate Solana security assurance: static analysis (Semgrep/SARIF), " +
      "supply chain, commit-bound manifests. " +
      "DEFAULT BEHAVIOR: If the user does not provide a URL, you MUST analyze the local host repository by invoking your security tools without any `cwd` argument (they will automatically target the local root). " +
      "EXTERNAL REPOS: ONLY if the user explicitly provides an external https Git URL, you must invoke the git_clone_repo tool first. Once cloned, explicitly pass the resulting workspace path " +
      "as the `cwd` parameter to EVERY subsequent security scan tool to focus analysis on that external repo. " +
      "If answering security questions, analyze state snapshots, CPI graphs, and hygiene.",
    tools: [
      solanaRpcReadTool,
      gitCloneRepoTool,
      gitDiffSummaryTool,
      writeAssuranceManifestTool,
      mergeFindingsTool,
      programAccountAnalyzerTool,
      programUpgradeMonitorTool,
      cpiGraphMapperTool,
      accountStateSnapshotTool,
      secretScannerTool,
      envHygieneCheckTool,
      unifiedPostureReportTool,
    ],
    subagents: [
      {
        name: "static-policy",
        description:
          "Static analysis and policy: Semgrep, SARIF merge, dependency posture.",
        systemPrompt:
          "Focus on SAST output and manifest hashes. Do not invent findings.",
      },
      {
        name: "build-verify",
        description: "Build and verify lane when cargo/Anchor is in scope.",
        systemPrompt:
          "When invoked, reason about Rust/Anchor build evidence; do not run unscoped shell.",
      },
    ],
  });
}

export { gitDiffSummaryTool, solanaRpcReadTool, writeAssuranceManifestTool };
