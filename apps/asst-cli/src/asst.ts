#!/usr/bin/env node
import dotenv from "dotenv";
import path from "node:path";
dotenv.config();
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), "..", "..", ".env.local") });

import { Command } from "commander";
import { intro, outro, text, confirm, spinner } from "@clack/prompts";
import { theme } from "./ui/theme.js";
import { scanCommand } from "./commands/scan.js";
import { chatCommand } from "./commands/chat.js";
import fs from "node:fs";

// -- Config Management --
const CONFIG_PATH = path.join(process.cwd(), ".asst", "config.json");

function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

function saveConfig(config: any) {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

async function ensureConfig() {
  if (process.env.OPENROUTER_API_KEY) return;

  intro(theme.brand(" ASST Configuration Needed "));
  console.log(theme.info("No OPENROUTER_API_KEY found. ASST needs an API key to function."));

  const apiKey = await text({
    message: "Enter your OpenRouter API Key:",
    placeholder: "sk-or-...",
    validate: (value) => {
      if (!value) return "API Key is required.";
      if (!value.startsWith("sk-or-")) return "Invalid key format. Should start with sk-or-";
    }
  });

  if (typeof apiKey === "symbol" || !apiKey) {
    console.log(theme.error("Configuration cancelled."));
    process.exit(1);
  }

  const envPath = path.join(process.cwd(), ".env");
  const envContent = `OPENROUTER_API_KEY=${apiKey}\n`;
  
  fs.writeFileSync(envPath, envContent, { flag: 'a' });
  process.env.OPENROUTER_API_KEY = apiKey;
  
  console.log(theme.success(`\nKey saved to ${envPath}`));
}

const program = new Command();
const config = loadConfig();

program
  .name("asst")
  .description(theme.brand("ASST Terminal") + " - ARES Solana Security Tool CLI")
  .version("1.1.0");

program
  .command("init")
  .description("Configure ASST environment (API Keys, RPC, etc.)")
  .action(async () => {
    intro(theme.brand(" ASST Terminal: Initialization "));
    await ensureConfig();
    outro(theme.success("Initialization complete!"));
  });

program
  .command("scan")
  .description("Run a full security assurance scan (L1-L6)")
  .argument("[path]", "Path to project root", ".")
  .option("-m, --model <model>", "LLM model to use")
  .action(async (targetPath, options) => {
    try {
      await ensureConfig();
      const model = options.model || config.model || "meta-llama/llama-3.3-70b-instruct:free";
      await scanCommand(targetPath, { ...options, model });
    } catch (error: any) {
      console.error("\n" + theme.error("Scan Error:") + " " + error.message);
      process.exit(1);
    }
  });

program
  .command("chat")
  .description("Start an interactive persistent chat session with the ASST agent")
  .option("-m, --model <model>", "LLM model to use")
  .action(async (options) => {
    try {
      await ensureConfig();
      
      const defaultModel = config.model || "meta-llama/llama-3.3-70b-instruct:free";
      const model = options.model || defaultModel;

      // Save as default if explicitly provided via flag
      if (options.model) {
        saveConfig({ ...config, model });
      }

      await chatCommand({ model });
      
    } catch (error: any) {
      if (error.code === 'ERR_MODULE_NOT_FOUND') {
        console.error(theme.error("\nModule Loading Error: ") + "One of the internal components could not be loaded.");
        console.log(theme.info("Try running 'npm install' or check the file paths in agent.ts."));
      } else {
        console.error("\n" + theme.error("Chat Error:") + " " + error.message);
      }
      
      // Essential: Keep terminal open on error
      console.log(theme.accent("\n[DEBUG] Press Enter to close this window..."));
      process.stdin.setRawMode(false);
      process.stdin.resume();
      await new Promise(resolve => process.stdin.once("data", resolve));
      process.exit(1);
    }
  });

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error: any) {
    console.error(theme.error("Fatal Execution Error:"), error.message);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

main();
