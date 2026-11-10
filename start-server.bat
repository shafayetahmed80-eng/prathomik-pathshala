@echo off
title Prathomik Pathshala - Multimedia Slide Hub
cd /d "C:\Projects\prathomik-pathshala"

echo ===================================================
echo        PRATHOMIK PATHSHALA LOCAL SERVER
echo       Class 3 English: The Ant and the Grasshopper
echo ===================================================
echo.

echo [1/3] Detecting Local IP for Mobile & Classroom Access...
set LOCAL_IP=
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set LOCAL_IP=%%a
)
if defined LOCAL_IP set LOCAL_IP=%LOCAL_IP: =%

echo.
echo [2/3] Checking Port 4000...
netstat -ano | findstr :4000 | findstr LISTENING >nul
if "%ERRORLEVEL%"=="0" (
    echo [OK] Server is already running on port 4000.
    echo Opening website in browser...
    start "" "http://localhost:4000/slides"
    echo.
    echo ===================================================
    echo  WEBSITE IS ALREADY LIVE:
    echo.
    echo  Slide Hub:       http://localhost:4000/slides
    echo  Home:            http://localhost:4000
    if defined LOCAL_IP (
    echo  Mobile/Tablet:   http://%LOCAL_IP%:4000/slides
    )
    echo ===================================================
    echo.
    pause
    exit /b
)

echo.
echo [3/3] Launching Next.js Dev Server & Browser...
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:4000/slides"

echo.
echo ===================================================
echo  WEBSITE IS STARTING:
echo.
echo  PC Browser:       http://localhost:4000/slides
echo  Home Page:        http://localhost:4000
if defined LOCAL_IP (
echo  Mobile/Tablet:    http://%LOCAL_IP%:4000/slides
echo  (Note: Mobile & PC must be connected to the same Wi-Fi)
)
echo.
echo  Keep this window open while using the website.
echo  Press Ctrl+C to stop the server anytime.
echo ===================================================
echo.

call pnpm dev --port 4000 --hostname 0.0.0.0
pause
