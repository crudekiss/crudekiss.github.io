@echo off
setlocal EnableDelayedExpansion

:: === CONFIG ===
set "downloadDir=%USERPROFILE%\Downloads"

:: Min and max delay between runs (in seconds)
set "minDelay=10"
set "maxDelay=30"

:loop
:: === Random delay before each loop iteration ===
set /a "range=%maxDelay% - %minDelay% + 1"
set /a "delay=!random! %% range + %minDelay%"
echo [⏳] Waiting !delay! seconds before checking...
timeout /t !delay! /nobreak >nul

cls
echo [🔍] Checking for missing files...

:: === Define list of files and links ===
set count=0

set /a count+=1
set "link[!count!]=https://i.4cdn.org/gif/1744577561978885.mp4"
set "file[!count!]=1744577561978885.mp4"

set /a count+=1
set "link[!count!]=https://i.4cdn.org/gif/1744575403937302.mp4"
set "file[!count!]=1744575403937302.mp4"

set /a count+=1
set "link[!count!]=https://i.4cdn.org/gif/1744533857442511.webm"
set "file[!count!]=1744533857442511.webm"

set /a count+=1
set "link[!count!]=https://i.4cdn.org/gif/1744571540831103.webm"
set "file[!count!]=1744571540831103.webm"

:: === Build list of missing files ===
set "candidates="
for /L %%i in (1,1,%count%) do (
    if not exist "%downloadDir%\!file[%%i]!" (
        set "candidates=!candidates! %%i"
    )
)

:: === Exit if all files are downloaded ===
if "!candidates!"=="" (
    echo [✓] All files already downloaded. Exiting...
    goto :EOF
)

:: === Pick a random missing index ===
set /a total=0
for %%i in (!candidates!) do (
    set /a total+=1
    set "idx[!total!]=%%i"
)

set /a "pick=!random! %% total + 1"
set "chosenIdx=!idx[%pick%]!"

:: === Download the selected file ===
set "selectedLink=!link[%chosenIdx%]!"
set "selectedFile=!file[%chosenIdx%]!"
set "dest=%downloadDir%\!selectedFile!"

echo [↓] Downloading: !selectedFile!
powershell -ExecutionPolicy Bypass -WindowStyle Hidden -Command ^
    "Invoke-WebRequest -Uri '!selectedLink!' -OutFile '!dest!' -UseBasicParsing"

:: === Run the file maximized ===
echo [▶] Running: !selectedFile!
start /max "" "!dest!"

goto loop

