:: Define pink RGB values
set PINK=255 192 203
set PINK_HEX=0xFFC0CB
set DARK_PINK=238 130 238
set DARK_PINK_HEX=0xEE82EE

:: Classic GUI colors
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v Background /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v Window /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v WindowText /t REG_SZ /d "0 0 0" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v ButtonFace /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v ButtonText /t REG_SZ /d "0 0 0" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v ActiveTitle /t REG_SZ /d "%DARK_PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v InactiveTitle /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v Menu /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v MenuText /t REG_SZ /d "0 0 0" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v Scrollbar /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v TitleText /t REG_SZ /d "0 0 0" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v ActiveBorder /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v InactiveBorder /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v AppWorkspace /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v Highlight /t REG_SZ /d "%DARK_PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v HighlightText /t REG_SZ /d "0 0 0" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v GrayText /t REG_SZ /d "100 100 100" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v HotTrackingColor /t REG_SZ /d "%DARK_PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v MenuBar /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Colors" /v MenuHilight /t REG_SZ /d "%DARK_PINK%" /f

:: Modern UI accent colors
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\DWM" /v ColorPrevalence /t REG_DWORD /d 1 /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\DWM" /v AccentColor /t REG_DWORD /d %PINK_HEX% /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\DWM" /v AccentColorInactive /t REG_DWORD /d %PINK_HEX% /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v AppsUseLightTheme /t REG_DWORD /d 0 /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v SystemUsesLightTheme /t REG_DWORD /d 0 /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v ColorPrevalence /t REG_DWORD /d 1 /f

:: Explorer and shell colors
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent" /v AccentColorMenu /t REG_DWORD /d %PINK_HEX% /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent" /v StartColorMenu /t REG_DWORD /d %PINK_HEX% /f
reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent" /v AccentPalette /t REG_BINARY /d ff4040ffffb2b2fffee6e6ffc0cbff82eeff4b97ff1561ff0033cc /f

:: High contrast pink (experimental)
reg add "HKEY_CURRENT_USER\Control Panel\Accessibility\HighContrast" /v "High Contrast Scheme" /t REG_SZ /d "Custom Pink" /f
reg add "HKEY_CURRENT_USER\Control Panel\Accessibility\HighContrast" /v "Window" /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Accessibility\HighContrast" /v "Button" /t REG_SZ /d "%PINK%" /f
reg add "HKEY_CURRENT_USER\Control Panel\Accessibility\HighContrast" /v "Text" /t REG_SZ /d "0 0 0" /f

:: Refresh Explorer
taskkill /IM explorer.exe /F >nul 2>&1
start explorer.exe

:: Notify user
echo Done! Restart or logoff to see all changes.

exit
