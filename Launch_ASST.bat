@echo off
setlocal enabledelayedexpansion

:: ==========================================
:: ASST CLI Agent Launcher (V6 - PRODUCTION)
:: ==========================================

set "ROOT=C:\Users\FTHMo\OneDrive\Documents\ASST"
set "CLI_DIR=%ROOT%\apps\asst-cli"

echo [ASST] Launching ARES Agentic Shell...
echo.

:: Navigate to CLI directory
cd /d "%CLI_DIR%"

:: Run the bundled version for maximum stability
:: Using 'cmd /k' so the window stays open even after the session ends
cmd /k "node dist/cli.cjs chat"

:: The user is now in a persistent CMD window with the agent output visible.
