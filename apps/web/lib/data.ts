import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function getAssuranceData() {
  const assuranceDir = join(process.cwd(), "../../assurance");
  
  if (!existsSync(assuranceDir)) {
    return { manifests: [], latest: null, supplyChain: null };
  }

  try {
    const files = readdirSync(assuranceDir);
    const manifests = files
      .filter((file) => file.match(/^run-.*\.json$/))
      .map((file) => {
        const path = join(assuranceDir, file);
        const data = JSON.parse(readFileSync(path, "utf8"));
        return { file, ...data };
      })
      .sort((a, b) => {
        return new Date(b.generated_at || 0).getTime() - new Date(a.generated_at || 0).getTime();
      });

    const supplyChainPath = join(assuranceDir, "supply-chain-merged.json");
    let supplyChain = null;
    if (existsSync(supplyChainPath)) {
      supplyChain = JSON.parse(readFileSync(supplyChainPath, "utf8"));
    }

    return {
      manifests,
      latest: manifests[0] || null,
      supplyChain,
    };
  } catch (error) {
    console.error("Error reading manifests:", error);
    return { manifests: [], latest: null, supplyChain: null };
  }
}
