import { existsSync } from "node:fs";
import { tool } from "langchain";
import { z } from "zod";

const schema = z.object({
  assuranceDir: z.string().describe("Path to assurance output directory"),
});

export const unifiedPostureReportTool = tool(
  async (input) => {
    if (!existsSync(input.assuranceDir)) {
      return "Assurance directory not found. Cannot generate posture report.";
    }

    return `Unified Posture Report initialized. 
The system automatically aggregates layer data. 
Instructions for LLM: Use readFile on the latest manifest and supply-chain JSON to compute the final letter grades. 
- L1 (Program Logic) = depends on AST/Semgrep critical findings.
- L3 (Chain State) = depends on program_upgrade_monitor immutability checks.
- L6 (Supply Chain) = depends on pnpm/cargo audit results.`;
  },
  {
    name: "unified_posture_report",
    description: "Helps generate the top-level 8-layer score for the dashboard.",
    schema,
  },
);
