@echo off
echo ===================================================
echo   Starting DevSecOps Dashboard Local Server
echo ===================================================
cd /d "%~dp0"

if not exist node_modules (
    echo [INFO] node_modules folder not found. Installing dependencies...
    call npm install
)

echo [INFO] Starting React Development Server...
call npm start
pause
