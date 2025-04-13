@echo off
title VM Hostile Color Apocalypse - INFINITE RAGE
echo Unleashing hostile registry chaos... Ctrl+C to stop, refresh for full insanity, reset VM to recover.
timeout /t 3

:: Optimize for speed
setlocal EnableDelayedExpansion
set "min=0"
set "max=255"

:: Infinite loop of destruction
:infiniteloop

:: Randomize desktop background colors
set /a "r=!random! %% (%max% - %min% + 1) + %min%"
set /a "g=!random! %% (%max% - %min% + 1) + %min%"
set /a "b=!random! %% (%max% - %min% + 1) + %min%"
reg add "HKCU\Control Panel\Colors" /v Background /t REG_SZ /d "!r! !g! !b!" /f
reg add "HKCU\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "" /f
reg add "HKCU\Control Panel\Desktop" /v WallpaperStyle /t REG_SZ /d "0" /f
reg add "HKCU\Control Panel\Desktop" /v TileWallpaper /t REG_SZ /d "0" /f

:: Slam visual effects to max chaos
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\VisualEffects" /v VisualFXSetting /t REG_DWORD /d 3 /f
reg add "HKCU\Control Panel\Desktop" /v UserPreferencesMask /t REG_BINARY /d ffffffff /f
reg add "HKCU\Control Panel\Desktop" /v DragFullWindows /t REG_SZ /d "1" /f
reg add "HKCU\Control Panel\Desktop" /v FontSmoothing /t REG_SZ /d "2" /f

:: Randomize ALL UI colors (hostile takeover)
for /l %%i in (1,1,10) do (
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v ActiveTitle /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v InactiveTitle /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v Window /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v WindowText /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v ButtonFace /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v ButtonText /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v Menu /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v MenuText /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v Highlight /t REG_SZ /d "!r! !g! !b!" /f
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Colors" /v HighlightText /t REG_SZ /d "!r! !g! !b!" /f
)

:: Randomize window metrics for hostile distortion
set /a "border=!random! %% 150 + 50"
set /a "caption=!random! %% 200 + 50"
set /a "scroll=!random! %% 300 + 100"
reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v BorderWidth /t REG_SZ /d "!border!" /f
reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v CaptionHeight /t REG_SZ /d "!caption!" /f
reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v CaptionWidth /t REG_SZ /d "!caption!" /f
reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v ScrollWidth /t REG_SZ /d "!scroll!" /f
reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v ScrollHeight /t REG_SZ /d "!scroll!" /f

:: Insane font scaling
set /a "fontscale=!random! %% 500 + 400"
reg add "HKCU\Control Panel\Desktop" /v LogPixels /t REG_DWORD /d !fontscale! /f

:: 100+ hostile UI tweaks (fonts, menus, icons, metrics)
for /l %%i in (1,1,50) do (
    set /a "r=!random! %% (%max% - %min% + 1) + %min%"
    set /a "g=!random! %% (%max% - %min% + 1) + %min%"
    set /a "b=!random! %% (%max% - %min% + 1) + %min%"
    reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v CaptionFont%%i /t REG_BINARY /d ff00000000000000 /f
    reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v MenuFont%%i /t REG_BINARY /d ff00000000000000 /f
    reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v IconFont%%i /t REG_BINARY /d ff00000000000000 /f
    reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v ScrollWidth%%i /t REG_SZ /d "!scroll!" /f
    reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v ScrollHeight%%i /t REG_SZ /d "!scroll!" /f
    reg add "HKCU\Control Panel\Desktop\WindowMetrics" /v BorderWidth%%i /t REG_SZ /d "!border!" /f
    reg add "HKCU\Control Panel\Colors" /v CustomColor%%i /t REG_SZ /d "!r! !g! !b!" /f
)

:: Giant, hostile cursors
reg add "HKCU\Control Panel\Cursors" /v Arrow /t REG_SZ /d "C:\Windows\Cursors\aero_arrow_xl.cur" /f
reg add "HKCU\Control Panel\Cursors" /v AppStarting /t REG_SZ /d "C:\Windows\Cursors\aero_working_xl.cur" /f
reg add "HKCU\Control Panel\Cursors" /v SizeAll /t REG_SZ /d "C:\Windows\Cursors\aero_move_xl.cur" /f
reg add "HKCU\Control Panel\Cursors" /v Hand /t REG_SZ /d "C:\Windows\Cursors\aero_link_xl.cur" /f
reg add "HKCU\Control Panel\Cursors" /v Scheme Source /t REG_DWORD /d 2 /f

:: Random taskbar and transparency tweaks
set /a "taskbar=!random! %% 2"
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v TaskbarGlomLevel /t REG_DWORD /d !taskbar! /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v EnableTransparency /t REG_DWORD /d !taskbar! /f

:: Force explorer refresh to apply some changes
taskkill /f /im explorer.exe >nul 2>&1
start explorer.exe

:: Loop back for infinite hostility
goto infiniteloop
