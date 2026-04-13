import { createAssuranceRunSolanaAgent, programAccountAnalyzerTool, programUpgradeMonitorTool, cpiGraphMapperTool, accountStateSnapshotTool, secretScannerTool, envHygieneCheckTool, unifiedPostureReportTool } from "./assurance-run-agent";
import { HumanMessage } from "@langchain/core/messages";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), "../.env.local"), quiet: true } as any);

async function main() {
  // Move execution context to the monorepo root so Git tools function correctly
  process.chdir(join(process.cwd(), ".."));

  const prompt = process.argv[2];
  if (!prompt) {
    console.error("Please provide a prompt");
    process.exit(1);
  }

  const agent = createAssuranceRunSolanaAgent();
  
  try {
    const response = await agent.invoke({
      messages: [new HumanMessage(prompt)],
    });
    
    // Extract the final message
    const lastMsg = response.messages[response.messages.length - 1];
    console.log(lastMsg.content);
  } catch (error) {
    console.error("Agent Error:", error);
    process.exit(1);
  }
}

main();
