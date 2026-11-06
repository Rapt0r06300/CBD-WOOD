@echo off
setlocal
cd /d "%~dp0.."
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-cloudflare-codex.ps1"
set EXITCODE=%ERRORLEVEL%
echo.
if not "%EXITCODE%"=="0" (echo Configuration Cloudflare incomplete. Verifiez les messages ci-dessus.) else (echo Configuration du poste terminee. Relancez Codex.)
pause
exit /b %EXITCODE%
