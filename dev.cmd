@echo off
REM Workaround for nvm-windows + "Program Files" path spaces breaking `nvm use`.
REM Uses the installed Node 22.17.1 directly.

set "NODE_DIR=C:\Program Files\nvm\v22.17.1"
if not exist "%NODE_DIR%\node.exe" (
  echo Node not found at "%NODE_DIR%\node.exe"
  echo Install Node 22.17.1 with nvm, or edit NODE_DIR in this script.
  exit /b 1
)

set "PATH=%NODE_DIR%;%PATH%"
cd /d "%~dp0"

echo Using:
node -v
npm -v
echo.
echo Starting Angular dev server...
call npm start
