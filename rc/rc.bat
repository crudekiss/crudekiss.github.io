@echo off
set log=%userprofile%\Desktop\admin_check.log

:: Check for admin rights
net session >nul 2>&1
if %errorlevel% == 0 (
    echo [%date% %time%] Running with Administrator privileges >> %log%
) else (
    echo [%date% %time%] Running without Administrator privileges >> %log%
)

exit
