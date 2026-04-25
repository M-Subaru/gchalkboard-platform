@echo off
set PATH=C:\nvm4w\nodejs;C:\Windows\System32;C:\Windows;%PATH%
cd /d "C:\Users\Subaru\Projects\GlobalChalkboard"
node node_modules\@opennextjs\cloudflare\dist\cli\index.js build
echo OPENNEXT_EXIT:%ERRORLEVEL%
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
node node_modules\wrangler\bin\wrangler.js deploy
echo DEPLOY_EXIT:%ERRORLEVEL%
